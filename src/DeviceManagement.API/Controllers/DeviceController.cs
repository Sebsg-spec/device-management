using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Device_management.Data;
using Device_management.Models;
using Device_management.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Device_management.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class DevicesController : ControllerBase
{
    private readonly DeviceDbContext _context;

    public DevicesController(DeviceDbContext context)
    {
        _context = context;
    }


    private int GetCurrentUserId()
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdString!);
    }

    [HttpPost("{id}/assign")]
    public async Task<IActionResult> AssignToSelf(int id)
    {
        var userId = GetCurrentUserId();

        // 1. Check if the device exists
        var deviceExists = await _context.Device.AnyAsync(d => d.Id == id);
        if (!deviceExists) return NotFound("Device not found.");

        // 2. Check if it's already assigned to someone (ReturnedAt is null)
        var activeAssignment = await _context.DeviceAssignment
            .FirstOrDefaultAsync(a => a.DeviceId == id && a.ReturnedAt == null);

        if (activeAssignment != null)
        {
            return BadRequest("This device is currently assigned to another user and cannot be claimed.");
        }

        // 3. Create the new assignment for the current user
        var newAssignment = new DeviceAssignment
        {
            DeviceId = id,
            UserId = userId,
            AssignedAt = DateTime.UtcNow
        };

        _context.DeviceAssignment.Add(newAssignment);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Device successfully assigned to you." });
    }

    [HttpPost("{id}/unassign")]
    public async Task<IActionResult> UnassignFromSelf(int id)
    {
        var userId = GetCurrentUserId();

        // 1. Find the active assignment for this device
        var activeAssignment = await _context.DeviceAssignment
            .FirstOrDefaultAsync(a => a.DeviceId == id && a.ReturnedAt == null);

        // 2. If it's not assigned at all
        if (activeAssignment == null)
        {
            return BadRequest("This device is not currently assigned to anyone.");
        }

        // 3. IMPORTANT: Ensure the person unassigning it is the person who owns it!
        if (activeAssignment.UserId != userId)
        {
            return StatusCode(403, "Forbidden: You can only unassign devices that are assigned to you.");
        }

        // 4. "Return" the device
        activeAssignment.ReturnedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Device successfully unassigned." });
    }

    // 1. Load data from the DB (Get All)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CurrentAssignmentView>>> GetDevices()
    {
        return await _context.CurrentAssignments.ToListAsync();
    }

    // 2. Select an item based on an ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Device>> GetDevice(int id)
    {
        var device = await _context.Device
        .Include(d => d.DeviceAssignments)
        .FirstOrDefaultAsync(d => d.Id == id);

        if (device == null)
        {
            return NotFound();
        }
        var activeAssignment = device.DeviceAssignments
        .FirstOrDefault(a => a.ReturnedAt == null);

        var devicePayload = new
        {
            device.Id,
            device.Name,
            device.ManufacturerId,
            device.Type,
            device.OperatingSystemId,
            device.OSVersion,
            device.Processor,
            device.RAM_MB,
            device.Description,
            device.LocationId,

            // This is the magic property Angular needs to set the dropdown!
            UserId = activeAssignment?.UserId
        };

        return Ok(devicePayload);
    }

    // 3. Insert a new item to the DB
    [HttpPost]
    public async Task<ActionResult<Device>> PostDevice(DeviceCreateDto dto)
    {
        var device = new Device
        {
            Name = dto.Name,
            ManufacturerId = dto.ManufacturerId,
            Type = dto.Type,
            OperatingSystemId = dto.OperatingSystemId,
            OSVersion = dto.OSVersion,
            Processor = dto.Processor,
            RAM_MB = dto.RAM_MB,
            Description = dto.Description,
            LocationId = dto.LocationId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Device.Add(device);
        await _context.SaveChangesAsync();

        if (dto.UserId.HasValue)
        {
            var assignment = new DeviceAssignment
            {
                DeviceId = device.Id,
                UserId = dto.UserId.Value,
                AssignedAt = DateTime.UtcNow
            };
            _context.DeviceAssignment.Add(assignment);
            await _context.SaveChangesAsync();
        }

        return Ok(device);
    }

    // 4. Update an existing item
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDevice(int id, DeviceUpdateDto dto)
    {
        if (id != dto.Id)
        {
            return BadRequest("ID mismatch");
        }

        // 1. Fetch the device AND its current active assignment (ReturnedAt is null)
        var device = await _context.Device
            .Include(d => d.DeviceAssignments.Where(a => a.ReturnedAt == null))
            .FirstOrDefaultAsync(d => d.Id == id);

        if (device == null)
        {
            return NotFound();
        }

        // 2. Update all the hardware and location properties
        device.Name = dto.Name;
        device.ManufacturerId = dto.ManufacturerId;
        device.Type = dto.Type;
        device.OperatingSystemId = dto.OperatingSystemId;
        device.OSVersion = dto.OSVersion;
        device.Processor = dto.Processor;
        device.RAM_MB = dto.RAM_MB;
        device.Description = dto.Description;
        device.LocationId = dto.LocationId;
        device.UpdatedAt = DateTime.UtcNow;

        // 3. Handle the Assignment Logic!
        var activeAssignment = device.DeviceAssignments.FirstOrDefault();

        // Check: Did the user actually change the assignment in the dropdown?
        if (activeAssignment?.UserId != dto.UserId)
        {
            // A. If someone previously had the device, "return" it today
            if (activeAssignment != null)
            {
                activeAssignment.ReturnedAt = DateTime.UtcNow;
            }

            // B. If a NEW user was selected, create a brand new assignment record
            if (dto.UserId.HasValue)
            {
                var newAssignment = new DeviceAssignment
                {
                    DeviceId = device.Id,
                    UserId = dto.UserId.Value,
                    AssignedAt = DateTime.UtcNow
                };
                _context.DeviceAssignment.Add(newAssignment);
            }
        }

        // 4. Save EVERYTHING in one transaction
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Device.Any(e => e.Id == id)) return NotFound();
            throw;
        }

        return NoContent();
    }

    // 5. Delete a specific item
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDevice(int id)
    {
        var device = await _context.Device.FindAsync(id);

        if (device == null)
        {
            return NotFound();
        }

        var assignments = await _context.DeviceAssignment
                                    .Where(a => a.DeviceId == id)
                                    .ToListAsync();

        if (assignments.Any())
        {
            _context.DeviceAssignment.RemoveRange(assignments);
        }

        
        _context.Device.Remove(device);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
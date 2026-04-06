using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Device_management.Data;
using Device_management.Models;
using Device_management.DTOs;

namespace Device_management.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DevicesController : ControllerBase
{
    private readonly DeviceDbContext _context;

    public DevicesController(DeviceDbContext context)
    {
        _context = context;
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
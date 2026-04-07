using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Device_management.Data;
using Device_management.Models;
using Device_management.DTOs;

namespace Device_management.Services;

public class DeviceService : IDeviceService
{
    private readonly DeviceDbContext _context;

    public DeviceService(DeviceDbContext context)
    {
        _context = context;
    }

    public async Task<Device> CreateDeviceAsync(DeviceCreateDto dto)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
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

            await transaction.CommitAsync();
            return device;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<IEnumerable<Device>> SearchDevicesAsync(string query)
    {
        var normalizedQuery = Regex.Replace(query.ToLower(), @"[^\w\s]", "");
        var tokens = normalizedQuery.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

        var allDevices = await _context.Device
            .Include(d => d.Manufacturer)      
            .Include(d => d.OperatingSystem)
            .Select(d => new
            {
                Device = d,
                DeviceName = d.Name,
                Manufacturer = d.Manufacturer.Name,
                Processor = d.Processor,
                Ram = d.RAM_MB
            })
            .ToListAsync();

        return allDevices.Select(x =>
        {
            int score = 0;
            string name = x.DeviceName?.ToLower() ?? "";
            string manufacturer = x.Manufacturer?.ToLower() ?? "";
            string processor = x.Processor?.ToLower() ?? "";
            string ram = x.Ram?.ToString() ?? "";

            foreach (var token in tokens)
            {
                if (name.Contains(token)) score += 4;
                if (manufacturer.Contains(token)) score += 3;
                if (processor.Contains(token)) score += 2;
                if (ram.Contains(token)) score += 1;
            }

            return new { x.Device, Score = score };
        })
        .Where(x => x.Score > 0)
        .OrderByDescending(x => x.Score)
        .ThenBy(x => x.Device.Name)
        .Select(x => x.Device)
        .ToList();
    }
}
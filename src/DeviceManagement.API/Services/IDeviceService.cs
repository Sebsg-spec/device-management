using Device_management.Models;
using Device_management.DTOs;

namespace Device_management.Services;

public interface IDeviceService
{
    Task<Device> CreateDeviceAsync(DeviceCreateDto dto);
    Task<IEnumerable<Device>> SearchDevicesAsync(string query);
}
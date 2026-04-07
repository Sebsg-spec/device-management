using Device_management.DTOs;

namespace Device_management.Services;

public interface IAiService
{
    Task<string?> GenerateDeviceDescriptionAsync(DeviceSpecsDto specs);
}
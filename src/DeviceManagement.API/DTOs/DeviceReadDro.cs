namespace Device_management.DTOs
{ 
public class DeviceReadDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string ManufacturerName { get; set; } = string.Empty;
    public string OSName { get; set; } = string.Empty;
    public string OSVersion { get; set; } = string.Empty;
        public string? AssignedUserName { get; set; }
    }
}

namespace Device_management.Models
{
    public class DeviceUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int ManufacturerId { get; set; }
        public string Type { get; set; } = string.Empty;
        public int OperatingSystemId { get; set; }
        public string OSVersion { get; set; } = string.Empty;
        public string? Processor { get; set; }
        public int? RAM_MB { get; set; }
        public string? Description { get; set; }
        public int? LocationId { get; set; }

        public int? UserId { get; set; }
    }
}
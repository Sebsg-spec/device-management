namespace Device_management.DTOs
{
    public class DeviceSpecsDto
    {
        public string Name { get; set; } = string.Empty;
        public string Manufacturer { get; set; } = string.Empty;
        public string OperatingSystem { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int? Ram { get; set; }
        public string Processor { get; set; } = string.Empty;
    }
}

namespace Device_management.Models
{
    public class CurrentAssignmentView
    {
        public int DeviceId { get; set; }
        public string DeviceName { get; set; } = string.Empty;
        public string DeviceType { get; set; } = string.Empty;
        public string OperatingSystem { get; set; } = string.Empty;
        public string OSVersion { get; set; } = string.Empty;
        public string Manufacturer { get; set; } = string.Empty;
        public int? UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserRole { get; set; }
        public string? UserCity { get; set; }
        public string? DeviceCity { get; set; }
        public DateTime? AssignedAt { get; set; }
    }
}
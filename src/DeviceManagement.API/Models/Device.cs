using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Device_management.Models
{
    public class Device
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int ManufacturerId { get; set; }
        public string Type { get; set; } = string.Empty; // 'Phone' or 'Tablet'
        public int OperatingSystemId { get; set; }
        public string OSVersion { get; set; } = string.Empty;
        public string? Processor { get; set; }
        public int? RAM_MB { get; set; }
        public string? Description { get; set; }
        public int? LocationId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        [ValidateNever]
        public virtual Manufacturer Manufacturer { get; set; } = null!;
        [ValidateNever]
        public virtual OperatingSystemModel OperatingSystem { get; set; } = null!;
        public virtual Location? Location { get; set; }
        public virtual ICollection<DeviceAssignment> DeviceAssignments { get; set; } = new List<DeviceAssignment>();
    }
}

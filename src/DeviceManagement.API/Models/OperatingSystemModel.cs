namespace Device_management.Models
{
    public class OperatingSystemModel // Renamed to avoid conflict with System.OperatingSystem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public virtual ICollection<Device> Devices { get; set; } = new List<Device>();
    }
}

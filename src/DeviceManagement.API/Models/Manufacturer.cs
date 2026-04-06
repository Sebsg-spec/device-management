namespace Device_management.Models
{
    public class Manufacturer
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public virtual ICollection<Device> Devices { get; set; } = new List<Device>();
    }
}

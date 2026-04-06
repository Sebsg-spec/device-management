namespace Device_management.Models
{
    public class DeviceAssignment
    {
        public int Id { get; set; }
        public int DeviceId { get; set; }
        public int UserId { get; set; }
        public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ReturnedAt { get; set; }

        public virtual Device Device { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}

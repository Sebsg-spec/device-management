using Microsoft.EntityFrameworkCore;
using Device_management.Models;


namespace Device_management.Data
{
    public class DeviceDbContext : DbContext
    {
        public DeviceDbContext(DbContextOptions<DeviceDbContext> options) : base(options) { }

        public DbSet<Manufacturer> Manufacturer { get; set; }
        public DbSet<OperatingSystemModel> OperatingSystem { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<Device> Device { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<DeviceAssignment> DeviceAssignment { get; set; }
        public DbSet<CurrentAssignmentView> CurrentAssignments { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map OperatingSystemModel to the "OperatingSystem" table in SQL
            modelBuilder.Entity<OperatingSystemModel>().ToTable("OperatingSystem");

            // Handle the check constraint for Device Type
            modelBuilder.Entity<Device>()
                .HasCheckConstraint("CHK_Device_Type", "Type IN ('Phone', 'Tablet')");

            // Handle the unique constraint for active assignments
            modelBuilder.Entity<DeviceAssignment>()
                .HasIndex(da => new { da.DeviceId, da.ReturnedAt })
                .IsUnique()
                .HasDatabaseName("UQ_Device_Active_Assignment");

            modelBuilder.Entity<CurrentAssignmentView>()
                .HasNoKey()
                .ToView("vw_CurrentAssignments");
        }
    }
}
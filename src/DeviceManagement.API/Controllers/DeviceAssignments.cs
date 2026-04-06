using Device_management.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Device_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceAssignments : ControllerBase
    {
        private readonly DeviceDbContext _context;
        private DeviceAssignments(DeviceDbContext context)
        {
            _context = context;
        }

    }
}

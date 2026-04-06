using Device_management.Data;
using Device_management.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Device_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperatingSystemsController : ControllerBase
    {
        private readonly DeviceDbContext _context;

        public OperatingSystemsController(DeviceDbContext context)
        {
            _context = context;
        }

        [HttpGet("/api/OperatingSystems")]
        public async Task<ActionResult<IEnumerable<OperatingSystemModel>>> GetOperatingSystems()
        {
            return await _context.OperatingSystem.ToListAsync();
        }
    }

   
    }

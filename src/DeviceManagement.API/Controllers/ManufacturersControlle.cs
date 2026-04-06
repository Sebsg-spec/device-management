using Device_management.Data;
using Device_management.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Device_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class ManufacturersControlle : ControllerBase
    {

        private readonly DeviceDbContext _context;

        public ManufacturersControlle(DeviceDbContext context)
        {
            _context = context;
        }

        [HttpGet("/api/Manufacturers")]
        public async Task<ActionResult<IEnumerable<Manufacturer>>> GetManufacturers()
        {
            return await _context.Manufacturer.ToListAsync();
        }

    }


    }

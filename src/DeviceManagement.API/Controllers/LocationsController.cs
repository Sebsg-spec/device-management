using Device_management.Data;
using Device_management.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Device_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly DeviceDbContext _context;

        public LocationsController(DeviceDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocations()
        {
           
            var locations = await _context.Location
                .Select(l => new { l.Id, l.Name })
                .ToListAsync();

            return Ok(locations);
        }

    }
}

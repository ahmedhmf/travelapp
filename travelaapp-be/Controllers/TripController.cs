using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using travelaapp_be.Data;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace travelaapp_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TripController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("secure")]
        public IActionResult GetUserTrips()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Ok(new { message = "You are authenticated", userId });
        }

        [Authorize]
        [HttpGet("admin-only")]
        public async Task<IActionResult> GetAdminTrips()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null || !Guid.TryParse(userId, out var guid))
                return Unauthorized();

            var user = await _context.Profiles.FirstOrDefaultAsync(p => p.Id == guid);

            if (user == null || user.Role != "admin")
                return Forbid("Admins only.");

            return Ok("Welcome, admin!");
        }
    }
}
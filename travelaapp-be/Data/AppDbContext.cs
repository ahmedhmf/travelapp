using Microsoft.EntityFrameworkCore;
using travelaapp_be.Models;

namespace travelaapp_be.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Profile> Profiles { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace travelaapp_be.Models
{
    [Table("profiles")]
    public class Profile
    {
        [Key]
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Full_Name { get; set; }
        public DateTime Created_At { get; set; }
    }
}

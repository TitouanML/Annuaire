
using System.ComponentModel.DataAnnotations;

namespace API_annuaire.API.Employees.DTO
{
    public class CreateEmployeeDTO
    {
        [Required]
        [StringLength(100)]
        public required string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public required string FirstName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public required string Email { get; set; }


        [StringLength(15)]
        [Phone]
        public string? MobilePhone { get; set; }

        [StringLength(255)]
        [Phone]
        public string? LandlinePhone { get; set; }

        [Required]
        public int SiteId { get; set; }

        [Required]
        public int ServiceId { get; set; }
    }
}

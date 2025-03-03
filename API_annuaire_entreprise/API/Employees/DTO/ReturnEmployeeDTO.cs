using API_annuaire.API.Services.DTO;
using API_annuaire.API.Services.Models;
using API_annuaire.API.Sites.DTO;
using API_annuaire.API.Sites.Models;
using System.ComponentModel.DataAnnotations;

namespace API_annuaire.API.Employees.DTO
{
    public class ReturnEmployeeDTO
    {
        [Required]
        [Key]
        public int Id { get; set; }

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
        public ReturnSiteDTO Site { get; set; }

        [Required]
        public ReturnServiceDTO Service { get; set; }


        public DateTime? DeletedAt { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using API_annuaire.Shared.Validators;

namespace API_annuaire.API.Administrators.DTO
{
    public class CreateAdministratorDTO
    {
        [Required]
        [StringLength(100)]
        public required string LastName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public required string FirstName { get; set; } = null!;

        [Required]
        [PasswordValidator]
        [StringLength(255)]
        public required string Password { get; set; } = null!;

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public required string Email { get; set; } = null!;
    }
}

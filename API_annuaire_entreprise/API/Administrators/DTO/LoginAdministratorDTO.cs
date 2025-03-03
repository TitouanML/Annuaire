using System.ComponentModel.DataAnnotations;
using API_annuaire.Shared.Validators;

namespace API_annuaire.API.Administrators.DTO
{
    public class LoginAdministratorDTO
    {
        [Required]
        [EmailAddress]
        public required string Email {  get; set; }

        [Required]
        [PasswordValidator]
        public required string Password { get; set; }
    }
}

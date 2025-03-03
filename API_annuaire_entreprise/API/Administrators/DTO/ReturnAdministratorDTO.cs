using System.ComponentModel.DataAnnotations;

namespace API_annuaire.API.Administrators.DTO
{
    public class ReturnAdministratorDTO
    {
        [Key]
        [Required]
        public required int Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string LastName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public required string FirstName { get; set; } = null!;

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public required string Email { get; set; } = null!;

        public DateTime? DeletedAt { get; set; }
    }
}

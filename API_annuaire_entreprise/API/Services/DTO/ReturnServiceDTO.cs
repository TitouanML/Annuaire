using System.ComponentModel.DataAnnotations;

namespace API_annuaire.API.Services.DTO
{
    public class ReturnServiceDTO
    {
        [Required]
        public required int Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string Name { get; set; } = null!;

        public DateTime? DeletedAt { get; set; }

    }
}

using System.ComponentModel.DataAnnotations;

namespace API_annuaire.API.Services.DTO
{
    public class CreateServiceDTO
    {

        [Required]
        [StringLength(100)]
        public required string Name { get; set; } = null!;

    }
}

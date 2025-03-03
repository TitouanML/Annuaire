using System.ComponentModel.DataAnnotations;
using API_annuaire.Shared.Validators;

namespace API_annuaire.API.Sites.DTO
{
    public class CreateSiteDTO
    {
        [Required]
        [StringLength(100)]
        [ZipCodeValidator]
        public required string ZipCode { get; set; }

        [Required]
        [StringLength(100)]
        public required string Name { get; set; }

        [Required]
        [StringLength(100)]
        public required string City { get; set; }
    }
}

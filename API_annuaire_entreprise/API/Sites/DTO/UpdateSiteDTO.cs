using API_annuaire.Shared.Validators;
using System.ComponentModel.DataAnnotations;

namespace API_annuaire.API.Sites.DTO
{
    public class UpdateSiteDTO
    {
        [Required]
        [StringLength(100)]
        public required string City { get; set; }

        [Required]
        [StringLength(100)]
        public required string Name { get; set; }

        [Required]
        [StringLength(100)]
        [ZipCodeValidator]
        public required string ZipCode { get; set; }
    }
}

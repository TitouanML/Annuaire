using API_annuaire.API.Sites.DTO;
using API_annuaire.API.Sites.Models;

namespace API_annuaire.API.Sites.Extensions
{
    public static class SiteExtension
    {
        public static Site MapToModel(this CreateSiteDTO site)
        {
            return new Site()
            {
                Name = site.Name,
                ZipCode = site.ZipCode,
                City = site.City,
            };
        }

        public static Site MapToModel(this UpdateSiteDTO site)
        {
            return new Site()
            {
                Name = site.Name,
                ZipCode = site.ZipCode,
                City = site.City,
            };
        }

        public static ReturnSiteDTO MapToReturn(this Site site)
        {
            return new ReturnSiteDTO()
            {
                Id = site.Id,
                Name = site.Name,
                ZipCode = site.ZipCode,
                City = site.City,
                DeletedAt = site.DeletedAt,
            };
        }
    }
}

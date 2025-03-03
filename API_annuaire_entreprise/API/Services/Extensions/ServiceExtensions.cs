
using API_annuaire.API.Services.DTO;
using API_annuaire.API.Services.Models;

namespace API_annuaire.API.Services.Extensions
{
    public static class ServiceExtensions
    {
        public static Service MapToModel(this CreateServiceDTO newService)
        {
            return new Service()
            {
                Name = newService.Name,
            };
        }

        public static Service MapToModel(this UpdateServiceDTO updatedService)
        {
            return new Service()
            {
                Name = updatedService.Name,
            };
        }


        public static ReturnServiceDTO MapToReturn(this Service service)
        {
            return new ReturnServiceDTO()
            {
                Id = service.Id,
                Name = service.Name,
                DeletedAt = service.DeletedAt,
            };
        }
    }
}

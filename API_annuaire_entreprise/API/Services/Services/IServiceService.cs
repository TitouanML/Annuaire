using API_annuaire.API.Services.DTO;
using API_annuaire.API.Services.Models;

namespace API_annuaire.API.Services.Services
{
    public interface IServiceService
    {
        Task<ReturnServiceDTO> AddAsync(CreateServiceDTO newService);
        Task<ReturnServiceDTO> UpdateAsync(UpdateServiceDTO updatedService, int id);
        Task<ReturnServiceDTO> SoftDeleteAsync(int id);
        Task<ReturnServiceDTO> RestoreAsync(int id);
        Task<ReturnServiceDTO> GetById(int id);
        Task<List<ReturnServiceDTO>> GetAll();
    }
}

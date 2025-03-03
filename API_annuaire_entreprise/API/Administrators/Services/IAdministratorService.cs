using API_annuaire.API.Administrators.DTO;
using API_annuaire.API.Administrators.Models;

namespace API_annuaire.API.Administrators.Services
{
    public interface IAdministratorService
    {
        Task<ReturnAdministratorDTO> AddAsync(CreateAdministratorDTO newAdministrator);
        Task<string> Login(LoginAdministratorDTO loginDTO);
        Task<ReturnAdministratorDTO> FindById(int id);
        Task<ReturnAdministratorDTO> UpdateAsync(UpdateAdministratorDTO updatedAdministrator, int id);
        Task<ReturnAdministratorDTO> SoftDeleteAsync(int id);
        Task<ReturnAdministratorDTO> RestoreAsync(int id);
        Task<List<ReturnAdministratorDTO>> GetAll(bool includeDeleted = false);
    }
}

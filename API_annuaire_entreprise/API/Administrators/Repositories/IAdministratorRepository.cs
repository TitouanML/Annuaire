using API_annuaire.API.Administrators.DTO;
using API_annuaire.API.Administrators.Models;
using MonApi.Shared.Repositories;

namespace API_annuaire.API.Administrators.Repositories
{
    public interface IAdministratorRepository : IBaseRepository<Administrator>
    {
        Task<List<ReturnAdministratorDTO>> GetAllAdministrators(bool includeDeleted = false, CancellationToken cancellation = default);
        void Detach(Administrator administrator);
    }
}

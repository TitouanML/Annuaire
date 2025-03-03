using API_annuaire.API.Services.DTO;
using API_annuaire.API.Services.Models;
using MonApi.Shared.Repositories;

namespace API_annuaire.API.Services.Repositories
{
    public interface IServiceRepository : IBaseRepository<Service>
    {
        Task<List<ReturnServiceDTO>> GetAllServices(CancellationToken cancellationToken = default);
        Task DeleteAllRelatedEmployees(int siteId,CancellationToken cancellationToken = default);
        Task RestoreAllRelatedEmployees(int siteId,CancellationToken cancellationToken = default);
    }
}

using API_annuaire.API.Sites.DTO;
using API_annuaire.API.Sites.Models;
using MonApi.Shared.Repositories;

namespace API_annuaire.API.Sites.Repositories
{
    public interface ISiteRepository : IBaseRepository<Site>
    {
        Task<List<ReturnSiteDTO>> GetAllSites(CancellationToken cancellationToken = default);
        Task DeleteAllRelatedEmployees(int id,CancellationToken cancellationToken = default);
        Task RestoreAllRelatedEmployees(int id,CancellationToken cancellationToken = default);
    }
}

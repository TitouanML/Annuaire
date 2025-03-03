using API_annuaire.API.Sites.DTO;
using API_annuaire.API.Sites.Models;
using MonApi.Shared.Repositories;

namespace API_annuaire.API.Sites.Services
{
    public interface ISiteService
    {
        Task<ReturnSiteDTO> AddAsync(CreateSiteDTO newSite);
        Task<ReturnSiteDTO> UpdateAsync(UpdateSiteDTO updateSite, int id);
        Task<ReturnSiteDTO> SoftDeleteAsync(int id);
        Task<ReturnSiteDTO> RestoreAsync(int id);
        Task<ReturnSiteDTO> GetById(int id);
        Task<List<ReturnSiteDTO>> GetAllSites();
    }
}

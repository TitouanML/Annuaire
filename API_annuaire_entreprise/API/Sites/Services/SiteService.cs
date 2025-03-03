
using API_annuaire.API.Sites.DTO;
using API_annuaire.API.Sites.Extensions;
using API_annuaire.API.Sites.Models;
using API_annuaire.API.Sites.Repositories;

namespace API_annuaire.API.Sites.Services
{
    public class SiteService : ISiteService
    {
        private readonly ISiteRepository _siteRepository;

        public SiteService(ISiteRepository siteRepository)
        {
            _siteRepository = siteRepository;
        }

        public async Task<ReturnSiteDTO> GetById(int id)
        {
            Site foundSite = await _siteRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            ReturnSiteDTO returnedSite = foundSite.MapToReturn();
            return returnedSite;
        }

        public async Task<List<ReturnSiteDTO>> GetAllSites()
        {
            List<ReturnSiteDTO> sites = await _siteRepository.GetAllSites();
            return sites;
        }


        public async Task<ReturnSiteDTO> AddAsync(CreateSiteDTO newSite)
        {
            Site toAddSite = newSite.MapToModel();
            var addedSite = await _siteRepository.AddAsync(toAddSite);
            Site newSiteDetails = await _siteRepository.FindAsync(addedSite.Id) ?? throw new KeyNotFoundException("Id not found");
            ReturnSiteDTO returnedSite = newSiteDetails.MapToReturn();
            return returnedSite;
        }

        public async Task<ReturnSiteDTO> UpdateAsync(UpdateSiteDTO updateSite, int id)
        {
            if (!(await _siteRepository.AnyAsync(s => s.Id == id))) throw new KeyNotFoundException("Id not found");

            Site siteToEdit = updateSite.MapToModel();
            siteToEdit.Id = id;
            await _siteRepository.UpdateAsync(siteToEdit);
            ReturnSiteDTO returnedSite = siteToEdit.MapToReturn();
            return returnedSite;
        }

        public async Task<ReturnSiteDTO> SoftDeleteAsync(int id)
        {
            Site siteToDelete = await _siteRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            siteToDelete.DeletedAt = DateTime.UtcNow;
            await _siteRepository.UpdateAsync(siteToDelete);
            await _siteRepository.DeleteAllRelatedEmployees(id);
            ReturnSiteDTO returnSite = siteToDelete.MapToReturn();
            return returnSite;
        }


        public async Task<ReturnSiteDTO> RestoreAsync(int id)
        {
            Site siteToRestore = await _siteRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            siteToRestore.DeletedAt = null;
            await _siteRepository.UpdateAsync(siteToRestore);
            await _siteRepository.RestoreAllRelatedEmployees(id);
            ReturnSiteDTO returnSite = siteToRestore.MapToReturn();
            return returnSite;
        }


    }
}

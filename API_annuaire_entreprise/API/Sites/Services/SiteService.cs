using API_annuaire.API.Employees.Repositories;
using API_annuaire.API.Sites.DTO;
using API_annuaire.API.Sites.Extensions;
using API_annuaire.API.Sites.Models;
using API_annuaire.API.Sites.Repositories;

namespace API_annuaire.API.Sites.Services
{
    public class SiteService : ISiteService
    {
        private readonly ISiteRepository _siteRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public SiteService(ISiteRepository siteRepository, IEmployeeRepository employeeRepository)
        {
            _siteRepository = siteRepository;
            _employeeRepository = employeeRepository;
        }

        // Récupère un site par son ID
        public async Task<ReturnSiteDTO> GetById(int id)
        {
            Site foundSite = await _siteRepository.FindAsync(id)
                ?? throw new KeyNotFoundException("Id not found");
            return foundSite.MapToReturn();
        }

        // Récupère tous les sites
        public async Task<List<ReturnSiteDTO>> GetAllSites()
        {
            return await _siteRepository.GetAllSites();
        }

        // Ajoute un nouveau site
        public async Task<ReturnSiteDTO> AddAsync(CreateSiteDTO newSite)
        {
            Site toAddSite = newSite.MapToModel();
            var addedSite = await _siteRepository.AddAsync(toAddSite);
            Site newSiteDetails = await _siteRepository.FindAsync(addedSite.Id)
                ?? throw new KeyNotFoundException("Id not found");
            return newSiteDetails.MapToReturn();
        }

        // Met à jour un site existant
        public async Task<ReturnSiteDTO> UpdateAsync(UpdateSiteDTO updateSite, int id)
        {
            if (!(await _siteRepository.AnyAsync(s => s.Id == id)))
                throw new KeyNotFoundException("Id not found");

            Site siteToEdit = updateSite.MapToModel();
            siteToEdit.Id = id;
            await _siteRepository.UpdateAsync(siteToEdit);
            return siteToEdit.MapToReturn();
        }

        // Suppression logique d'un site
        public async Task<ReturnSiteDTO> SoftDeleteAsync(int id)
        {
            Site siteToDelete = await _siteRepository.FindAsync(id)
                ?? throw new KeyNotFoundException("Id not found");

            // Vérifie si des employés actifs sont liés au site
            if (await _employeeRepository.AnyAsync(e => e.SiteId == siteToDelete.Id && e.DeletedAt == null))
                throw new Exception("Cannot delete site as there are employees related to it.");

            siteToDelete.DeletedAt = DateTime.UtcNow;
            await _siteRepository.UpdateAsync(siteToDelete);
            return siteToDelete.MapToReturn();
        }

        // Restaure un site supprimé
        public async Task<ReturnSiteDTO> RestoreAsync(int id)
        {
            Site siteToRestore = await _siteRepository.FindAsync(id)
                ?? throw new KeyNotFoundException("Id not found");

            siteToRestore.DeletedAt = null;
            await _siteRepository.UpdateAsync(siteToRestore);
            await _siteRepository.RestoreAllRelatedEmployees(id); // Restaure aussi les employés liés
            return siteToRestore.MapToReturn();
        }
    }
}

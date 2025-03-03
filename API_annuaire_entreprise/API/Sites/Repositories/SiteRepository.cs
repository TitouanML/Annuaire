using API_annuaire.API.Sites.DTO;
using API_annuaire.API.Sites.Models;
using API_annuaire.Shared.Data;
using Microsoft.EntityFrameworkCore;
using MonApi.Shared.Repositories;

namespace API_annuaire.API.Sites.Repositories
{
    public class SiteRepository : BaseRepository<Site>, ISiteRepository
    {
        public SiteRepository(AnnuaireEntrepriseContext context) : base(context) 
        { }

        public async Task<List<ReturnSiteDTO>> GetAllSites(CancellationToken cancellationToken = default)
        {
            return await (from sites in _context.Sites select new ReturnSiteDTO() {Id= sites.Id, City = sites.City, Name = sites.Name, ZipCode = sites.ZipCode, DeletedAt = sites.DeletedAt }).ToListAsync(cancellationToken);
        }

        public async Task DeleteAllRelatedEmployees(int siteId, CancellationToken cancellationToken = default)
        {
            await _context.Employees.Where(e => e.SiteId == siteId).ForEachAsync(employee => employee.DeletedAt = DateTime.UtcNow, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task RestoreAllRelatedEmployees(int siteId, CancellationToken cancellationToken = default)
        {
            // Récupérer les IDs des services actifs (non supprimés)
            var activeServiceIds = await _context.Services
                .Where(s => s.DeletedAt == null)
                .Select(s => s.Id)
                .ToListAsync(cancellationToken);

            // Restaurer uniquement les employés dont le service est actif
            await _context.Employees
                .Where(e => e.SiteId == siteId && e.DeletedAt != null && activeServiceIds.Contains(e.ServiceId))
                .ForEachAsync(employee => employee.DeletedAt = null, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
        }

    }
}

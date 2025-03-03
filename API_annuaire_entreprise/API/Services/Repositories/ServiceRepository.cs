using API_annuaire.API.Services.DTO;
using API_annuaire.API.Services.Models;
using API_annuaire.Shared.Data;
using MonApi.Shared.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API_annuaire.API.Services.Repositories
{
    public class ServiceRepository : BaseRepository<Service>, IServiceRepository
    {
        public ServiceRepository(AnnuaireEntrepriseContext context) : base(context)
        {
        }

        public async Task<List<ReturnServiceDTO>> GetAllServices(CancellationToken cancellationToken = default)
        {
            return await (from services in _context.Services
                          select new ReturnServiceDTO
                          {
                              Id = services.Id,
                              Name = services.Name,
                              DeletedAt = services.DeletedAt,
                          })
                          .ToListAsync(cancellationToken);
        }

        public async Task DeleteAllRelatedEmployees(int serviceId,CancellationToken cancellationToken)
        {
            await _context.Employees.Where(e => e.ServiceId == serviceId).ForEachAsync(employee => employee.DeletedAt = DateTime.UtcNow,cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task RestoreAllRelatedEmployees(int serviceId, CancellationToken cancellationToken)
        {
            // Récupérer les IDs des sites actifs (non supprimés)
            var activeSiteIds = await _context.Sites
                .Where(site => site.DeletedAt == null)
                .Select(site => site.Id)
                .ToListAsync(cancellationToken);

            // Restaurer uniquement les employés liés au service et dont le site est actif
            await _context.Employees
                .Where(e => e.ServiceId == serviceId && e.DeletedAt != null && activeSiteIds.Contains(e.SiteId))
                .ForEachAsync(employee => employee.DeletedAt = null, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
        }



    }
}

using API_annuaire.API.Administrators.DTO;
using API_annuaire.API.Administrators.Models;
using API_annuaire.Shared.Data;
using Microsoft.EntityFrameworkCore;
using MonApi.Shared.Repositories;

namespace API_annuaire.API.Administrators.Repositories
{
    public class AdministratorRepository : BaseRepository<Administrator>, IAdministratorRepository
    {
        public AdministratorRepository(AnnuaireEntrepriseContext context) : base(context)
        { }

        public async Task<List<ReturnAdministratorDTO>> GetAllAdministrators(bool includeDeleted = false, CancellationToken cancellationToken = default)
        {
            var query = _context.Administrators.AsQueryable();

            if (!includeDeleted)
            {
                query = query.Where(a => !a.DeletedAt.HasValue);
            }

            return await query
                .Select(admin => new ReturnAdministratorDTO
                {
                    Email = admin.Email,
                    Id = admin.Id,
                    LastName = admin.LastName,
                    FirstName = admin.FirstName,
                    DeletedAt = admin.DeletedAt
                })
                .ToListAsync(cancellationToken);
        }

        public void Detach(Administrator administrator)
        {
            var entry = _context.Entry(administrator);
            if (entry.State == EntityState.Detached)
                return;

            entry.State = EntityState.Detached;
        }
    }
}

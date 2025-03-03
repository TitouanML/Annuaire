using API_annuaire.API.Employees.DTO;
using API_annuaire.API.Employees.Models;
using API_annuaire.API.Services.DTO;
using API_annuaire.API.Sites.DTO;
using API_annuaire.Shared.Data;
using Microsoft.EntityFrameworkCore;
using MonApi.Shared.Repositories;

namespace API_annuaire.API.Employees.Repositories
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(AnnuaireEntrepriseContext context) : base(context)
        {
        }

        public async Task<List<ReturnEmployeeDTO>> GetAllEmployees(
            int? siteId = null,
            int? serviceId = null,
            string? deleted = null,
            CancellationToken cancellationToken = default)
        {
            var query = from employees in _context.Employees
                        join site in _context.Sites on employees.SiteId equals site.Id
                        join service in _context.Services on employees.ServiceId equals service.Id
                        select new ReturnEmployeeDTO
                        {
                            Id = employees.Id,
                            LastName = employees.LastName,
                            FirstName = employees.FirstName,
                            Email = employees.Email,
                            LandlinePhone = employees.LandlinePhone,
                            MobilePhone = employees.MobilePhone,
                            Service = new ReturnServiceDTO
                            {
                                Id = service.Id,
                                Name = service.Name
                            },
                            Site = new ReturnSiteDTO
                            {
                                Id = site.Id,
                                Name = site.Name,
                                City = site.City,
                                ZipCode = site.ZipCode
                            },
                            DeletedAt = employees.DeletedAt,
                        };

            // Query params pour la recherche d'employés
            if (deleted == "only")
            {
                query = query.Where(e => e.DeletedAt != null);
            }

            if (deleted == "none")
            {
                query = query.Where(e => e.DeletedAt == null);
            }

            if (deleted == "all")
            { 
                query = query.Where(e => e.DeletedAt != null || e.DeletedAt == null);
            }

            if (siteId.HasValue)
            {
                query = query.Where(e => e.Site.Id == siteId.Value);
            }

            if (serviceId.HasValue)
            {
                query = query.Where(e => e.Service.Id == serviceId.Value);
            }

            return await query.ToListAsync(cancellationToken);
        }


        public void Detach(Employee employee)
        {
            var entry = _context.Entry(employee);
            if (entry.State == EntityState.Detached)
            {
                return;
            }
            entry.State = EntityState.Detached;
        }
    }
}
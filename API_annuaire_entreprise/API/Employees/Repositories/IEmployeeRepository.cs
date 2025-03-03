using API_annuaire.API.Employees.DTO;
using API_annuaire.API.Employees.Models;
using MonApi.Shared.Repositories;

namespace API_annuaire.API.Employees.Repositories
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    { 
        Task<List<ReturnEmployeeDTO>> GetAllEmployees( int? siteId = null, int?serviceId = null, string? deleted = null, CancellationToken cancellationToken = default);
        void Detach(Employee employee);
    }
}

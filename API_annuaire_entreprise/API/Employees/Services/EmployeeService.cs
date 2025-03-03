using API_annuaire.API.Employees.DTO;
using API_annuaire.API.Employees.Extensions;
using API_annuaire.API.Employees.Models;
using API_annuaire.API.Employees.Repositories;
using API_annuaire.API.Services.DTO;
using API_annuaire.API.Services.Extensions;
using API_annuaire.API.Services.Models;
using API_annuaire.API.Services.Repositories;
using API_annuaire.API.Sites.DTO;
using API_annuaire.API.Sites.Extensions;
using API_annuaire.API.Sites.Models;
using API_annuaire.API.Sites.Repositories;

namespace API_annuaire.API.Employees.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ISiteRepository _siteRepository;
        private readonly IServiceRepository _serviceRepository;

        public EmployeeService(IEmployeeRepository employeeRepository, IServiceRepository serviceRepository, ISiteRepository siteRepository)
        {
            _employeeRepository = employeeRepository;
            _siteRepository = siteRepository;
            _serviceRepository = serviceRepository;
        }

        public async Task<ReturnEmployeeDTO> AddAsync(CreateEmployeeDTO newEmployee)
        {
            if (await _employeeRepository.AnyAsync(e => e.Email == newEmployee.Email)) throw new Exception("An employee already possess this email");
            Site foundSite = await _siteRepository.FindAsync(newEmployee.SiteId) ?? throw new KeyNotFoundException("Site does not exist");
            ReturnSiteDTO relatedSite = foundSite.MapToReturn();
            Service foundService = await _serviceRepository.FindAsync(newEmployee.ServiceId) ?? throw new KeyNotFoundException("Service does not exist");
            ReturnServiceDTO relatedService = foundService.MapToReturn();

            Employee employeeToAdd = newEmployee.MapToModel();



            Employee addedEmployee = await _employeeRepository.AddAsync(employeeToAdd);

            Employee addedEmployeeDetails = await _employeeRepository.FindAsync(employeeToAdd.Id) ?? throw new KeyNotFoundException("Id not found");

            return addedEmployeeDetails.MapToReturn(relatedSite, relatedService);
        }

        public async Task<ReturnEmployeeDTO> UpdateAsync(UpdateEmployeeDTO updateEmployee, int id)
        {
            if (!(await _employeeRepository.AnyAsync(e => e.Id == id))) throw new KeyNotFoundException("Id not found");
            Site foundSite = await _siteRepository.FindAsync(updateEmployee.SiteId) ?? throw new KeyNotFoundException("Site does not exist");
            ReturnSiteDTO relatedSite = foundSite.MapToReturn();
            Service foundService = await _serviceRepository.FindAsync(updateEmployee.ServiceId) ?? throw new KeyNotFoundException("Service does not exist");
            ReturnServiceDTO relatedService = foundService.MapToReturn();

            Employee toUpdateEmployee = updateEmployee.MapToModel();
            toUpdateEmployee.Id = id;
            await _employeeRepository.UpdateAsync(toUpdateEmployee);

            return toUpdateEmployee.MapToReturn(relatedSite, relatedService);
        }

        public async Task<ReturnEmployeeDTO> SoftDeleteAsync(int id)
        {

            Employee toDeleteEmployee = await _employeeRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            Site foundSite = await _siteRepository.FindAsync(toDeleteEmployee.SiteId) ?? throw new KeyNotFoundException("Site does not exist");
            ReturnSiteDTO relatedSite = foundSite.MapToReturn();
            Service foundService = await _serviceRepository.FindAsync(toDeleteEmployee.ServiceId) ?? throw new KeyNotFoundException("Service does not exist");
            ReturnServiceDTO relatedService = foundService.MapToReturn();

            toDeleteEmployee.DeletedAt = DateTime.UtcNow;
            await _employeeRepository.UpdateAsync(toDeleteEmployee);

            return toDeleteEmployee.MapToReturn(relatedSite, relatedService);
        }

        public async Task<ReturnEmployeeDTO> RestoreAsync(int id)
        {

            Employee toDeleteEmployee = await _employeeRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            Site foundSite = await _siteRepository.FindAsync(toDeleteEmployee.SiteId) ?? throw new KeyNotFoundException("Site does not exist");
            ReturnSiteDTO relatedSite = foundSite.MapToReturn();
            Service foundService = await _serviceRepository.FindAsync(toDeleteEmployee.ServiceId) ?? throw new KeyNotFoundException("Service does not exist");
            ReturnServiceDTO relatedService = foundService.MapToReturn();

            toDeleteEmployee.DeletedAt = null;
            await _employeeRepository.UpdateAsync(toDeleteEmployee);

            return toDeleteEmployee.MapToReturn(relatedSite, relatedService);
        }

        public async Task<ReturnEmployeeDTO> GetById(int id)
        {
            Employee foundEmployee = await _employeeRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            Site foundSite = await _siteRepository.FindAsync(foundEmployee.SiteId) ?? throw new KeyNotFoundException("Site does not exist");
            ReturnSiteDTO relatedSite = foundSite.MapToReturn();
            Service foundService = await _serviceRepository.FindAsync(foundEmployee.ServiceId) ?? throw new KeyNotFoundException("Service does not exist");
            ReturnServiceDTO relatedService = foundService.MapToReturn();

            return foundEmployee.MapToReturn(relatedSite, relatedService);
        }

        public async Task<List<ReturnEmployeeDTO>> GetAll(int? siteId = null, int? serviceId = null)
        {
            List<ReturnEmployeeDTO> employees = await _employeeRepository.GetAllEmployees(siteId, serviceId);
            return employees;
        }
    }
}
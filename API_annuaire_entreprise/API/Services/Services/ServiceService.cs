using API_annuaire.API.Employees.Repositories;
using API_annuaire.API.Services.DTO;
using API_annuaire.API.Services.Extensions;
using API_annuaire.API.Services.Models;
using API_annuaire.API.Services.Repositories;
using API_annuaire.Shared.Data;
using MonApi.Shared.Repositories;

namespace API_annuaire.API.Services.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _serviceRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public ServiceService(IServiceRepository serviceRepository, IEmployeeRepository employeeRepository)
        {
            _serviceRepository = serviceRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task<ReturnServiceDTO> AddAsync(CreateServiceDTO newService)
        {
            if (await _serviceRepository.AnyAsync(s => s.Name == newService.Name)) throw new Exception("City already exists.");

            Service serviceToAdd = newService.MapToModel();
            Service addedService = await _serviceRepository.AddAsync(serviceToAdd) ?? throw new Exception("Error while adding");
            Service addedServiceDetails = await _serviceRepository.FindAsync(addedService.Id) ?? throw new KeyNotFoundException("Id not found");
            ReturnServiceDTO returnedService = addedServiceDetails.MapToReturn();

            return returnedService;
        }

        public async Task<ReturnServiceDTO> UpdateAsync(UpdateServiceDTO updatedService, int id)
        {

            Service toUpdateService = updatedService.MapToModel();
            toUpdateService.Id = id;

            await _serviceRepository.UpdateAsync(toUpdateService);

            Service updatedServiceDetails = await _serviceRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");

            return updatedServiceDetails.MapToReturn();
        }

        public async Task<ReturnServiceDTO> SoftDeleteAsync(int id)
        {


            Service toDeleteService = await _serviceRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            if (await _employeeRepository.AnyAsync(e => (e.ServiceId == toDeleteService.Id) && (e.DeletedAt == null))) throw new Exception("Cannot delete service as there is employees related to it.");
            toDeleteService.DeletedAt = DateTime.UtcNow;

            await _serviceRepository.UpdateAsync(toDeleteService);

            return toDeleteService.MapToReturn();
        }

        public async Task<ReturnServiceDTO> RestoreAsync(int id)
        {


            Service toDeleteService = await _serviceRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");

            toDeleteService.DeletedAt = null;
            await _serviceRepository.UpdateAsync(toDeleteService);

            return toDeleteService.MapToReturn();
        }

        public async Task<ReturnServiceDTO> GetById(int id)
        {
            Service foundService = await _serviceRepository.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            return foundService.MapToReturn();
        }

        public async Task<List<ReturnServiceDTO>> GetAll()
        {
            List<ReturnServiceDTO> services = await _serviceRepository.GetAllServices();
            return services;
        }
    }
}


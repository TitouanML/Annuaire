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

        // Ajoute un nouveau service
        public async Task<ReturnServiceDTO> AddAsync(CreateServiceDTO newService)
        {
            if (await _serviceRepository.AnyAsync(s => s.Name == newService.Name))
                throw new Exception("Service already exists.");

            Service serviceToAdd = newService.MapToModel();
            Service addedService = await _serviceRepository.AddAsync(serviceToAdd)
                ?? throw new Exception("Error while adding");

            Service addedServiceDetails = await _serviceRepository.FindAsync(addedService.Id)
                ?? throw new KeyNotFoundException("Id not found");

            return addedServiceDetails.MapToReturn();
        }

        // Met à jour un service existant
        public async Task<ReturnServiceDTO> UpdateAsync(UpdateServiceDTO updatedService, int id)
        {
            Service toUpdateService = updatedService.MapToModel();
            toUpdateService.Id = id;

            await _serviceRepository.UpdateAsync(toUpdateService);

            Service updatedServiceDetails = await _serviceRepository.FindAsync(id)
                ?? throw new KeyNotFoundException("Id not found");

            return updatedServiceDetails.MapToReturn();
        }

        // Supprime logiquement un service (soft delete)
        public async Task<ReturnServiceDTO> SoftDeleteAsync(int id)
        {
            Service toDeleteService = await _serviceRepository.FindAsync(id)
                ?? throw new KeyNotFoundException("Id not found");

            // Vérifie si des employés actifs sont liés au service
            if (await _employeeRepository.AnyAsync(e => e.ServiceId == toDeleteService.Id && e.DeletedAt == null))
                throw new Exception("Cannot delete service as there are employees related to it.");

            toDeleteService.DeletedAt = DateTime.UtcNow;
            await _serviceRepository.UpdateAsync(toDeleteService);

            return toDeleteService.MapToReturn();
        }

        // Restaure un service supprimé
        public async Task<ReturnServiceDTO> RestoreAsync(int id)
        {
            Service toRestoreService = await _serviceRepository.FindAsync(id)
                ?? throw new KeyNotFoundException("Id not found");

            toRestoreService.DeletedAt = null;
            await _serviceRepository.UpdateAsync(toRestoreService);

            return toRestoreService.MapToReturn();
        }

        // Récupère un service par son ID
        public async Task<ReturnServiceDTO> GetById(int id)
        {
            Service foundService = await _serviceRepository.FindAsync(id)
                ?? throw new KeyNotFoundException("Id not found");

            return foundService.MapToReturn();
        }

        // Récupère la liste de tous les services
        public async Task<List<ReturnServiceDTO>> GetAll()
        {
            return await _serviceRepository.GetAllServices();
        }
    }
}

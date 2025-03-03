using API_annuaire.API.Employees.DTO;

namespace API_annuaire.API.Employees.Services
{
    public interface IEmployeeService
    {
        Task<ReturnEmployeeDTO> AddAsync(CreateEmployeeDTO newEmployee);
        Task<ReturnEmployeeDTO> UpdateAsync(UpdateEmployeeDTO updatedEmployee, int id);
        Task<ReturnEmployeeDTO> SoftDeleteAsync(int id);
        Task<ReturnEmployeeDTO> RestoreAsync(int id);
        Task<ReturnEmployeeDTO> GetById(int id);
        Task<List<ReturnEmployeeDTO>> GetAll(int? siteId,int? serviceId);
    }
}

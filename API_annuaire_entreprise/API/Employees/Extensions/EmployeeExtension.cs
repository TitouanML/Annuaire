using API_annuaire.API.Employees.DTO;
using API_annuaire.API.Employees.Models;
using API_annuaire.API.Services.DTO;
using API_annuaire.API.Sites.DTO;

namespace API_annuaire.API.Employees.Extensions
{
    public static class EmployeeExtension
    {
        public static Employee MapToModel(this CreateEmployeeDTO newEmployee)
        {
            return new Employee()
            {
                LastName = newEmployee.LastName,
                FirstName = newEmployee.FirstName,
                Email = newEmployee.Email,
                LandlinePhone = newEmployee.LandlinePhone,
                MobilePhone = newEmployee.MobilePhone,
                SiteId = newEmployee.SiteId,
                ServiceId = newEmployee.ServiceId,
            };
        }

        public static Employee MapToModel(this UpdateEmployeeDTO updateEmployee)
        {
            return new Employee()
            {
                LastName = updateEmployee.LastName,
                FirstName = updateEmployee.FirstName,
                Email = updateEmployee.Email,
                LandlinePhone = updateEmployee.LandlinePhone,
                MobilePhone = updateEmployee.MobilePhone,
                SiteId = updateEmployee.SiteId,
                ServiceId = updateEmployee.ServiceId,
            };
        }

        public static ReturnEmployeeDTO MapToReturn(this Employee employee, ReturnSiteDTO site, ReturnServiceDTO service)
        {
            return new ReturnEmployeeDTO()
            {
                Id = employee.Id,
                LastName = employee.LastName,
                FirstName = employee.FirstName,
                Email = employee.Email,
                LandlinePhone = employee.LandlinePhone,
                MobilePhone = employee.MobilePhone,
                Site = site,
                Service = service,
                DeletedAt = employee.DeletedAt,
            };
        }
    }
}

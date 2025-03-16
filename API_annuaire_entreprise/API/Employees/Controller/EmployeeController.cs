using API_annuaire.API.Employees.DTO;
using API_annuaire.API.Employees.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_annuaire.API.Employees.Controller
{
    [ApiController]
    [Route("employees")] // Route de base pour ce contrôleur
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // Ajouter un employé (authentification requise)
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] CreateEmployeeDTO newEmployee)
        {
            var adding = await _employeeService.AddAsync(newEmployee);
            return Ok(adding);
        }

        // Mettre à jour un employé (authentification requise)
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee([FromBody] UpdateEmployeeDTO updateEmployee, [FromRoute] int id)
        {
            var edited = await _employeeService.UpdateAsync(updateEmployee, id);
            return Ok(edited);
        }

        // Supprimer un employé (authentification requise)
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteEmployee([FromRoute] int id)
        {
            await _employeeService.SoftDeleteAsync(id);
            return Ok();
        }

        // Restaurer un employé supprimé (authentification requise)
        [Authorize]
        [HttpPut("restore/{id}")]
        public async Task<IActionResult> RestoreEmployee([FromRoute] int id)
        {
            await _employeeService.RestoreAsync(id);
            return Ok();
        }

        // Récupérer un employé par ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById([FromRoute] int id)
        {
            var found = await _employeeService.GetById(id);
            return Ok(found);
        }

        // Récupérer tous les employés, avec filtres optionnels par site ou service
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees([FromQuery] int? siteId, [FromQuery] int? serviceId)
        {
            var employees = await _employeeService.GetAll(siteId, serviceId);
            return Ok(employees);
        }
    }
}

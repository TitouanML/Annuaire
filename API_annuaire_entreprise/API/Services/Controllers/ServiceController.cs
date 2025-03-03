using API_annuaire.API.Services.DTO;
using API_annuaire.API.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_annuaire.API.Services.Controllers
{
    [ApiController]
    [Route("services")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddService([FromBody] CreateServiceDTO newService)
        {
            var adding = await _serviceService.AddAsync(newService);
            return Ok(adding);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService([FromBody] UpdateServiceDTO updateService, [FromRoute] int id)
        {
            var edited = await _serviceService.UpdateAsync(updateService, id);
            return Ok(edited);
        }


        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDelete([FromRoute] int id)
        {
            await _serviceService.SoftDeleteAsync(id);
            return Ok();
        }

        [Authorize]
        [HttpPut("restore/{id}")]
        public async Task<IActionResult> Restore([FromRoute] int id)
        {
            await _serviceService.RestoreAsync(id);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            ReturnServiceDTO foundService = await _serviceService.GetById(id);
            return Ok(foundService);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<ReturnServiceDTO> foundServices = await _serviceService.GetAll();
            return Ok(foundServices);
        }
    }
}


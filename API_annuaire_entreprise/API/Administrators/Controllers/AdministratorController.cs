using API_annuaire.API.Administrators.DTO;
using API_annuaire.API.Administrators.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_annuaire.API.Administrators.Controllers
{

    [ApiController]
    [Route("administrators")]
    public class AdministratorController : ControllerBase
    {
        private readonly IAdministratorService _administratorService;

        public AdministratorController(IAdministratorService administratorService)
        {
            _administratorService = administratorService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AddAdministrator([FromBody] CreateAdministratorDTO newAdministrator)
        {
            var adding = await _administratorService.AddAsync(newAdministrator);
            return Ok(adding);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginAdministrator([FromBody] LoginAdministratorDTO loginAdministrator)
        {
            var token = await _administratorService.Login(loginAdministrator);
            return Ok(new
            {
                token,
            });
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> FindAdministratorById([FromRoute] int id)
        {
            var searched = await _administratorService.FindById(id);
            return Ok(searched);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllAdministrators([FromQuery] bool includeDeleted = false)
        {
            List<ReturnAdministratorDTO> administrators = await _administratorService.GetAll(includeDeleted);
            return Ok(administrators);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteAsync([FromRoute] int id)
        {
            await _administratorService.SoftDeleteAsync(id);
            return Ok();
        }

        [Authorize]
        [HttpPut("restore/{id}")]
        public async Task<IActionResult> RestoreAsync([FromRoute] int id)
        {
            await _administratorService.RestoreAsync(id);
            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateAdministratorDTO updateAdministrator, int id)
        {
            var edited = await _administratorService.UpdateAsync(updateAdministrator, id);
            return Ok(edited);
        }
    }
}

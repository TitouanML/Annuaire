using API_annuaire.API.Administrators.DTO;
using API_annuaire.API.Administrators.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_annuaire.API.Administrators.Controllers
{
    [ApiController]
    [Route("administrators")] // Route de base pour ce contrôleur
    public class AdministratorController : ControllerBase
    {
        private readonly IAdministratorService _administratorService;

        public AdministratorController(IAdministratorService administratorService)
        {
            _administratorService = administratorService;
        }

        // Ajouter un administrateur (authentification requise)
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddAdministrator([FromBody] CreateAdministratorDTO newAdministrator)
        {
            var adding = await _administratorService.AddAsync(newAdministrator);
            return Ok(adding);
        }

        // Authentification d'un administrateur sans besoin d'autorisation (public)
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

        // Récupérer un administrateur par ID (authentification requise)
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> FindAdministratorById([FromRoute] int id)
        {
            var searched = await _administratorService.FindById(id);
            return Ok(searched);
        }

        // Récupérer tous les administrateurs (authentification requise)
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllAdministrators([FromQuery] bool includeDeleted = false)
        {
            List<ReturnAdministratorDTO> administrators = await _administratorService.GetAll(includeDeleted);
            return Ok(administrators);
        }

        // Supprimer un administrateur (authentification requise)
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteAsync([FromRoute] int id)
        {
            await _administratorService.SoftDeleteAsync(id);
            return Ok();
        }

        // Restaurer un administrateur supprimé (authentification requise)
        [Authorize]
        [HttpPut("restore/{id}")]
        public async Task<IActionResult> RestoreAsync([FromRoute] int id)
        {
            await _administratorService.RestoreAsync(id);
            return Ok();
        }

        // Mettre à jour un administrateur (authentification requise)
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateAdministratorDTO updateAdministrator, int id)
        {
            var edited = await _administratorService.UpdateAsync(updateAdministrator, id);
            return Ok(edited);
        }
    }
}

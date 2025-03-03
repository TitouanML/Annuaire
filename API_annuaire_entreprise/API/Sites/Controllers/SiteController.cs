
using API_annuaire.API.Sites.DTO;
using API_annuaire.API.Sites.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_annuaire.API.Sites.Controllers
{
    [ApiController]
    [Route("sites")]
    public class SiteController : ControllerBase
    {
        private readonly ISiteService _siteService;

        public SiteController(ISiteService siteService)
        {
            _siteService = siteService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSite([FromRoute] int id)
        {
            var found = await _siteService.GetById(id);
            return Ok(found);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sites = await _siteService.GetAllSites();
            return Ok(sites);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddSite([FromBody] CreateSiteDTO newSite)
        {
            var adding = await _siteService.AddAsync(newSite);
            return Ok(adding);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSite([FromBody] UpdateSiteDTO updateSite, [FromRoute] int id)
        {
            var edited = await _siteService.UpdateAsync(updateSite, id);
            return Ok(edited);
        }


        [Authorize]
        [HttpPut("restore/{id}")]
        public async Task<IActionResult> RestoreSite([FromRoute] int id)
        {
            var edited = await _siteService.RestoreAsync(id);
            return Ok(edited);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteSite([FromRoute] int id)
        {
            var deleted = await _siteService.SoftDeleteAsync(id);
            return Ok();
        }


    }
}

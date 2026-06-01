using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduktyController : ControllerBase
    {
        private readonly IProduktyService _produktyService;

        public ProduktyController(IProduktyService produktyService)
        {
            _produktyService = produktyService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Produkt>> Get([FromQuery] string? nazwa, [FromQuery] int strona = 1, [FromQuery] int rozmiar = 10) 
            => Ok(_produktyService.GetAll(nazwa, strona, rozmiar));

        [HttpGet("{id}")]
        public ActionResult<Produkt> Get(int id)
        {
            var produkt = _produktyService.GetById(id);
            return produkt !=  null ? Ok(produkt) : NotFound();
        }

        [HttpPost]
        public ActionResult<bool> Post([FromBody] Produkt produkt) {
            _produktyService.Add(produkt);
            return Ok(true);
        }

        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] Produkt produkt)
        {
            if (id != produkt.Id) return BadRequest(false);
            _produktyService.Update(produkt);
            return Ok(true);
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            var deleted = _produktyService.Delete(id);
            return deleted ? Ok(true) : NotFound(false);
        }
    }
}

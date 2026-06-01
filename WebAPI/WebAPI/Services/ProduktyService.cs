using System.Reflection.Metadata.Ecma335;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class ProduktyService : IProduktyService
    {
        private readonly static List<Produkt> _produkty = new List<Produkt>()
        {
            new Produkt(1, "Chleb", 4.50m, DateTime.Now.AddDays(3)),
            new Produkt(2, "Mleko", 3.20m, DateTime.Now.AddDays(5)),
            new Produkt(3, "Coca-cola", 7.20m, DateTime.Now.AddDays(360))
        };

        //public IEnumerable<Produkt> GetAll() => _produkty;

        public IEnumerable<Produkt> GetAll(string? nazwa = null, int strona = 1, int rozmiar = 10)
        {
            var query = _produkty.AsQueryable();
            if (!string.IsNullOrEmpty(nazwa))
            {
                query = query.Where(p => p.Nazwa.Contains(nazwa, StringComparison.OrdinalIgnoreCase));
            }

            return query
                .Skip((strona - 1) * rozmiar)
                .Take(rozmiar)
                .ToList();
        }

        public Produkt? GetById(int id) => _produkty.FirstOrDefault(p => p.Id == id); 

        public void Add(Produkt produkt)
        {
            int nextId = _produkty.Any() ? _produkty.Max(p => p.Id) + 1 : 1;
            _produkty.Add(produkt with { Id = nextId });
        }

        public void Update(Produkt produkt)
        {
            var index = _produkty.FindIndex(p => p.Id == produkt.Id);
            if (index != -1) _produkty[index] = produkt;
        }

        public bool Delete(int id)
        {
            var produkt = _produkty.FirstOrDefault(p => p.Id == id);
            if (produkt == null) return false;
            return _produkty.Remove(produkt);
        }
    }
}

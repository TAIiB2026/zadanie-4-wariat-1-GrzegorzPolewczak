using WebAPI.Models;

namespace WebAPI.Services
{
    public interface IProduktyService
    {
        IEnumerable<Produkt> GetAll(string? nazwa = null, int strona = 1, int rozmiar = 10);
        Produkt? GetById(int id);
        void Add(Produkt produkt);
        void Update(Produkt produkt);
        bool Delete(int id);
    }
}

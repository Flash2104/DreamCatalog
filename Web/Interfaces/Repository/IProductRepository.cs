using System.Linq;
using Web.Data.Entities;

namespace Web.Interfaces.Repository
{
    public interface IProductRepository: IRepository<DbProduct>
    {
        IQueryable<DbProduct> QueryAll();
    }
}
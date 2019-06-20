using System.Linq;
using Web.Data;
using Web.Data.Entities;
using Web.Interfaces.Repository;

namespace Web.Repositories
{
    public class ProductRepository : EfRepository<DbProduct>, IProductRepository
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public IQueryable<DbProduct> QueryAll()
        {
            return _appDbContext.Products.AsQueryable();
        }
    }
}

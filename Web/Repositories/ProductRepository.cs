using System;
using System.Linq;
using System.Linq.Expressions;
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

        public int Count(Expression<Func<DbProduct, bool>> expression)
        {
            return _appDbContext.Products.Where(expression).Count();
        }

        public IQueryable<DbProduct> QueryAll()
        {
            return _appDbContext.Products.AsQueryable();
        }
    }
}

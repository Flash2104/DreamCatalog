using System;
using System.Linq;
using System.Linq.Expressions;
using Web.Data.Entities;

namespace Web.Interfaces.Repository
{
    public interface IProductRepository: IRepository<DbProduct>
    {
        IQueryable<DbProduct> QueryAll();

        int Count(Expression<Func<DbProduct, bool>> expression);
    }
}
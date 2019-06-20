using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Web.Data.Entities;

namespace Web.Interfaces.Repository
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<T> GetById(int id);
        Task<List<T>> ListAll();
        IQueryable<T> QueryByCondition(Expression<Func<T, bool>> expression);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task DeleteRange(IEnumerable<T> entities);
    }
}

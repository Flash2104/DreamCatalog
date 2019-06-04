using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Data.Entities;

namespace Web.Interfaces.Repository
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<T> GetById(int id);
        Task<List<T>> ListAll();
        Task<T> GetSingleBySpec(ISpecification<T> spec);
        Task<List<T>> List(ISpecification<T> spec);
        Task<T> Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);
    }
}

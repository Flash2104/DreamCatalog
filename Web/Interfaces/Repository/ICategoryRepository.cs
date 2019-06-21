using System.Linq;
using Web.Data.Entities;

namespace Web.Interfaces.Repository
{
    public interface ICategoryRepository: IRepository<DbCategory>
    {
        IQueryable<DbCategory> QueryAll();
    }
}
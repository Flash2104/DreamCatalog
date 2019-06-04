using Web.Data;
using Web.Data.Entities;
using Web.Interfaces.Repository;

namespace Web.Repositories
{
    public class CategoryRepository : EfRepository<DbCategory>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
    }
}

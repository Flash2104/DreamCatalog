using Web.Data;
using Web.Data.Entities;
using Web.Interfaces.Repository;

namespace Web.Repositories
{
    public class ImageRepository : EfRepository<DbImage>, IImageRepository
    {
        public ImageRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
    }
}


namespace Web.Data.Entities
{
    public class DbCategoryProduct
    {
        public int CategoryId { get; set; }
        public DbCategory Category { get; set; }

        public int ProductId { get; set; }
        public DbProduct Product { get; set; }
    }
}

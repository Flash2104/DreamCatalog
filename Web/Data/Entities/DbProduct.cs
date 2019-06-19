using System.Collections.Generic;

namespace Web.Data.Entities
{
    public class DbProduct : BaseEntity
    {
        public string Title { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public int ImageId { get; set; }

        public virtual DbImage Image { get; set; }

        public IList<DbCategoryProduct> CategoryProducts { get; set; }
    }
}

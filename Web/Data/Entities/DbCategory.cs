using System.Collections.Generic;

namespace Web.Data.Entities
{
    public class DbCategory : BaseEntity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int ParentId { get; set; }

        public DbCategory Parent { get; set; }

        public List<DbCategory> Children { get; set; } = new List<DbCategory>();

        public IList<DbCategoryProduct> CategoryProducts { get; set; }

    }
}

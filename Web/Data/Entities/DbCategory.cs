using System.Collections.Generic;

namespace Web.Data.Entities
{
    public class DbCategory : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int ParentId { get; set; }

        public virtual DbCategory Parent { get; set; }

        public IList<DbCategoryProduct> CategoryProducts { get; set; }
    }
}

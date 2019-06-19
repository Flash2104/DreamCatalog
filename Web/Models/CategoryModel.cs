using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class CategoryModel : BaseEntityModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int? ParentId { get; set; }
    }
}

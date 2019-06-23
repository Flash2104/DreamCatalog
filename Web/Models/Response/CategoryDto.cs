using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models.Response
{
    public class CategoryTreeDto : BaseEntityDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public List<CategoryTreeDto> Children { get; set; }

        public CategoryTreeDto()
        {
            Children = new List<CategoryTreeDto>();
        }
    }

    public class CategoryDto : BaseEntityDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int? ParentId { get; set; }
    }
}

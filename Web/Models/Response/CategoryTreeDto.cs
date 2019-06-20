using System;
using System.Collections.Generic;

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
}

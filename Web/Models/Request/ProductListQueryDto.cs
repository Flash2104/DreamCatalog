using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models.Request
{
    public class ProductListQueryDto
    {
        public int CategoryId { get; set; }

        public int Take { get; set; }

        public int Skip { get; set; }

        public SortRequestModel Sort { get; set; }
    }

    public class SortRequestModel
    {
        public string Column { get; set; }

        public bool IsAsc { get; set; }
    }
}

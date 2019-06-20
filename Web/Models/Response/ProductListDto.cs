using System.Collections.Generic;

namespace Web.Models.Response
{
    public class ProductListDto
    {
        public List<ProductDto> List { get; set; }
        
        public int TotalElements { get; set; }              
    }
}

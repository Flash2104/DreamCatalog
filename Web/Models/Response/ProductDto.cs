
using System.Collections.Generic;

namespace Web.Models.Response
{
    public class ProductListDto
    {
        public List<ProductViewDto> List { get; set; }

        public int TotalElements { get; set; }
    }

    public class BaseProductDto : BaseEntityDto
    {
        public string Title { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public int CategoryId { get; set; }
    }

    public class ProductDto : BaseProductDto
    {
        public ImageDto Image { get; set; }
    }

    public class ProductViewDto : BaseProductDto
    {
        public int ImageId { get; set; }
    }
}

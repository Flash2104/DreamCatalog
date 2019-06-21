
using Web.Models.Response;

namespace Web.Models.Request
{
    public class ProductUpdateRequestDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Price { get; set; }

        public int Quantity { get; set; }

        public int CategoryId { get; set; }

        public ImageDto Image { get; set; }
    }
}

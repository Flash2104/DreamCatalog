
namespace Web.Models.Response
{
    public class ProductDto : BaseEntityDto
    {
        public string Title { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public int CategoryId { get; set; }
        
        public virtual ImageDto Image { get; set; }
    }
}

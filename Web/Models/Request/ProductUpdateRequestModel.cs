
namespace Web.Models.Request
{
    public class ProductCreateRequestModel
    {
        public string Title { get; set; }

        public int Price { get; set; }

        public int Quantity { get; set; }

        // ToDo: public int ImageId { get; set; }
    }

    public class ProductUpdateRequestModel : ProductCreateRequestModel
    {
        public int Id { get; set; }
    }
}

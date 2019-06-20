
namespace Web.Models.Response
{
    public class ImageDto : BaseEntityDto
    {
        public byte[] Buffer { get; set; }

        public string Title { get; set; }
    }
}

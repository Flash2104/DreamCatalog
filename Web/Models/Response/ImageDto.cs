
using System.Buffers.Text;

namespace Web.Models.Response
{
    public class ImageDto : BaseEntityDto
    {
        public string Base64String { get; set; }

        public string Title { get; set; }
    }
}

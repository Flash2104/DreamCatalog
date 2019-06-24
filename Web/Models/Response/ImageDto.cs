
using System.Buffers.Text;
using System.ComponentModel.DataAnnotations;

namespace Web.Models.Response
{
    public class ImageDto : BaseEntityDto
    {
        [Required(ErrorMessage = "\"Фото\" должно быть добавлено")]
        public string Base64String { get; set; }

        public string Title { get; set; }
    }
}

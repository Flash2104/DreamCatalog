
using System.ComponentModel.DataAnnotations;
using Web.Models.Response;

namespace Web.Models.Request
{
    public class ProductUpdateRequestDto
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "Поле \"Название\" должно быть заполнено")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Поле \"Цена\" должно быть заполнено")]
        public decimal? Price { get; set; }

        [Required(ErrorMessage = "Поле \"Количество\" должно быть заполнено")]
        public int? Quantity { get; set; }

        [Required(ErrorMessage = "Продукт без категории")]
        public int? CategoryId { get; set; }

        [Required(ErrorMessage = "\"Фото\" должно быть добавлено")]
        public ImageDto Image { get; set; }
    }
}

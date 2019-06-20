using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Data.Entities
{
    public class DbProduct : BaseEntity
    {
        public string Title { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        [Column(nameof(Image))]
        public int ImageId { get; set; }

        [ForeignKey(nameof(ImageId))]
        public virtual DbImage Image { get; set; }

        [Column(nameof(Category))]
        public int CategoryId { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public virtual DbCategory Category { get; set; }
    }
}

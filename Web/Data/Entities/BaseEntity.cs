using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Data.Entities
{
    public class BaseEntity
    {
        [Key]
        public int? Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}

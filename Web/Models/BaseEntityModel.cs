using System;

namespace Web.Models
{
    public abstract class BaseEntityModel
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}

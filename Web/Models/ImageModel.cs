using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class ImageModel : BaseEntityModel
    {
        public byte[] Buffer { get; set; }

        public string Title { get; set; }
    }
}

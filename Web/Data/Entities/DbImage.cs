
namespace Web.Data.Entities
{
    public class DbImage : BaseEntity
    {
        public byte[] Buffer { get; set; }

        public string Title { get; set; }

        public DbImage()
        {        
        }
    }
}

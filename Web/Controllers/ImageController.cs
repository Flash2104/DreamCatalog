using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.Interfaces.Repository;

namespace Web.Controllers
{
    [Route("[controller]")]
    public class ImageController: ControllerBase
    {
        private readonly IImageRepository _imageRepository;

        public ImageController(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var dbImage = await _imageRepository.GetById(id);
            return File(dbImage.Buffer, "image/jpeg");
        }
    }
}

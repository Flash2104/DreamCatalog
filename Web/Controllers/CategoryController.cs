using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.Interfaces.Services;
using Web.Models.Response;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this._categoryService = categoryService;
        }

        [HttpGet("get-tree")]
        public async Task<ResponseDto<List<CategoryTreeDto>>> ListAllCategories()
        {
            await Task.Delay(1000);
            return await _categoryService.ListAllCategories();
        }

        [HttpGet("get")]
        public async Task<ResponseDto<CategoryDto>> GetCategory(int id)
        {
            await Task.Delay(1000);
            return await _categoryService.GetCategory(id);
        }
    }
}

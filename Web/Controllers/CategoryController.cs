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
        public async Task<BaseResponse<List<CategoryTreeDto>>> ListAllCategories()
        {
            await Task.Delay(500); 
            return await _categoryService.ListAllCategories();
        }

        [HttpGet("get")]
        public async Task<BaseResponse<CategoryDto>> GetCategory(int id)
        {
            await Task.Delay(500);
            return await _categoryService.GetCategory(id);
        }
    }
}

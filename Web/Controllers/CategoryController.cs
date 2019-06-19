using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.Interfaces.Services;
using Web.Models;

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

        [HttpGet]
        public Task<ResponseModel<List<CategoryTreeModel>>> ListAllCategories()
        {
            return _categoryService.ListAllCategories();
        }

        [HttpGet("get/{id}")]
        public Task<ResponseModel<CategoryModel>> GetCategory(int id)
        {
            return _categoryService.GetCategory(id);
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.Interfaces.Services;
using Web.Models.Response;
using Web.Models.Request;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("query-list")]
        public BaseResponse<ProductListDto> QueryList([FromBody]ProductListQueryDto query)
        {
            return _productService.QueryList(query);
        }

        [HttpGet("get")]
        public async Task<BaseResponse<ProductDto>> GetProduct(int id)
        {
            await Task.Delay(500);
            return await _productService.GetProduct(id);
        }

        [HttpPost("create")]
        public async Task<BaseResponse<ProductDto>> CreateProduct([FromBody] ProductUpdateRequestDto model)
        {
            if (ModelState.IsValid)
            {
                return await _productService.CreateProduct(model);
            }
            return new FailureResponse<ProductDto>(GetErrorMessages());
        }

        [HttpPut("update")]
        public async Task<BaseResponse<ProductDto>> UpdateProduct([FromBody] ProductUpdateRequestDto model)
        {
            if (ModelState.IsValid)
            {
                return await _productService.UpdateProduct(model);
            }
            return new FailureResponse<ProductDto>(GetErrorMessages());
        }

        [HttpDelete("delete-products")]
        public Task<BaseResponse<int>> DeleteProducts([FromBody] int[] ids)
        {
            return _productService.DeleteProducts(ids);
        }

        private List<string> GetErrorMessages()
        {
            var errors = new List<string>();
            foreach (var modelState in ModelState.Values)
            {
                foreach (var error in modelState.Errors)
                {
                    errors.Add(error.ErrorMessage);
                }
            }
            return errors;
        }
    }
}

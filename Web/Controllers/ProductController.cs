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
        public ResponseDto<ProductListDto> QueryList([FromBody]ProductListQueryDto query)
        {
            Task.Delay(1000);
            return _productService.QueryList(query);
        }

        [HttpGet("get")]
        public async Task<ResponseDto<ProductDto>> GetProduct(int id)
        {
            await Task.Delay(1000);
            return await _productService.GetProduct(id);
        }

        [HttpPost("create")]
        public async Task<ResponseDto<ProductDto>> CreateProduct([FromBody] ProductUpdateRequestDto model)
        {
            await Task.Delay(1000);
            return await _productService.CreateProduct(model);
        }

        [HttpPut("update")]
        public async Task<ResponseDto<ProductDto>> UpdateProduct([FromBody] ProductUpdateRequestDto model)
        {
            await Task.Delay(1000);
            return await _productService.UpdateProduct(model);
        }

        [HttpDelete("delete-products")]
        public Task<ResponseDto<int>> DeleteProducts([FromBody] int[] ids)
        {
            return _productService.DeleteProducts(ids);
        }
    }
}

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Web.Interfaces.Services;
using Web.Models;
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

        [HttpGet]
        public ResponseModel<List<ProductModel>> ListAll(int categoryId)
        {
            return _productService.ListAll(categoryId);
        }

        [HttpPost("[action]")]
        public ResponseModel<List<ProductModel>> QueryList([FromBody]ProductListQueryModel query)
        {
            return _productService.QueryList(query);
        }

        [HttpPost("[action]")]
        public ResponseModel<ProductModel> CreateProduct([FromBody] ProductCreateRequestModel model)
        {
            return _productService.CreateProduct(model);
        }

        [HttpPut("[action]")]
        public ResponseModel<ProductModel> UpdateProduct([FromBody] ProductUpdateRequestModel model)
        {
            return _productService.UpdateProduct(model);
        }

        [HttpDelete()]
        public ResponseModel<int> DeleteProducts([FromBody] int[] ids)
        {
            return _productService.DeleteProducts(ids);
        }
    }
}

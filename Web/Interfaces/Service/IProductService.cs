using System.Collections.Generic;
using Web.Models;
using Web.Models.Request;

namespace Web.Interfaces.Services
{
    public interface IProductService
    {
        ResponseModel<List<ProductModel>> ListAll(int categoryId);

        ResponseModel<List<ProductModel>> QueryList(ProductListQueryModel query);

        ResponseModel<ProductModel> CreateProduct(ProductCreateRequestModel model);

        ResponseModel<ProductModel> UpdateProduct(ProductUpdateRequestModel model);

        ResponseModel<int> DeleteProducts(int[] ids);
    }
}
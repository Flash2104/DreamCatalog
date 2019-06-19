using System.Collections.Generic;
using Web.Interfaces.Services;
using Web.Models;
using Web.Models.Request;

namespace Web.Services
{
    public class ProductService : IProductService
    {
        public ResponseModel<ProductModel> CreateProduct(ProductCreateRequestModel model)
        {
            throw new System.NotImplementedException();
        }

        public ResponseModel<int> DeleteProducts(int[] ids)
        {
            throw new System.NotImplementedException();
        }

        public ResponseModel<List<ProductModel>> ListAll(int categoryId)
        {
            throw new System.NotImplementedException();
        }

        public ResponseModel<List<ProductModel>> QueryList(ProductListQueryModel query)
        {
            throw new System.NotImplementedException();
        }

        public ResponseModel<ProductModel> UpdateProduct(ProductUpdateRequestModel model)
        {
            throw new System.NotImplementedException();
        }
    }
}

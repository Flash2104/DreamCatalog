using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Models.Response;
using Web.Models.Request;

namespace Web.Interfaces.Services
{
    public interface IProductService
    {
        BaseResponse<ProductListDto> QueryList(ProductListQueryDto query);

        Task<BaseResponse<ProductDto>> GetProduct(int id);

        Task<BaseResponse<ProductDto>> CreateProduct(ProductUpdateRequestDto model);

        Task<BaseResponse<ProductDto>> UpdateProduct(ProductUpdateRequestDto model);

        Task<BaseResponse<int>> DeleteProducts(int[] ids);
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Models.Response;
using Web.Models.Request;

namespace Web.Interfaces.Services
{
    public interface IProductService
    {
        ResponseDto<ProductListDto> QueryList(ProductListQueryDto query);

        Task<ResponseDto<ProductDto>> CreateProduct(ProductUpdateRequestDto model);

        Task<ResponseDto<ProductDto>> UpdateProduct(ProductUpdateRequestDto model);

        Task<ResponseDto<int>> DeleteProducts(int[] ids);
    }
}
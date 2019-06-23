using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Models.Response;

namespace Web.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<BaseResponse<List<CategoryTreeDto>>> ListAllCategories();

        Task<BaseResponse<CategoryDto>> GetCategory(int id);
    }
}
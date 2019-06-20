using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Models.Response;

namespace Web.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<ResponseDto<List<CategoryTreeDto>>> ListAllCategories();

        Task<ResponseDto<CategoryDto>> GetCategory(int id);
    }
}
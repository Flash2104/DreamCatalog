using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<ResponseModel<List<CategoryTreeModel>>> ListAllCategories();

        Task<ResponseModel<CategoryModel>> GetCategory(int id);
    }
}
using System.Collections.Generic;
using Web.Models;

namespace Web.Interfaces.Services
{
    public interface ICategoryService
    {
        ResponseModel<List<CategoryTreeModel>> ListAllCategories();

        ResponseModel<CategoryModel> GetCategory(int id);
    }
}
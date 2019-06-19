using System.Collections.Generic;
using Web.Interfaces.Services;
using Web.Models;

namespace Web.Services
{
    public class CategoryService : ICategoryService
    {
        public ResponseModel<CategoryModel> GetCategory(int id)
        {
            throw new System.NotImplementedException();
        }

        public ResponseModel<List<CategoryTreeModel>> ListAllCategories()
        {
            throw new System.NotImplementedException();
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Interfaces.Repository;
using Web.Interfaces.Services;
using Web.Models;

namespace Web.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryReposytory;

        public CategoryService(ICategoryRepository categoryReposytory)
        {
            _categoryReposytory = categoryReposytory;

        }

        public async Task<ResponseModel<List<CategoryTreeModel>>> ListAllCategories()
        {
            var allCategories = await _categoryReposytory.ListAll();
            var resultList = new List<CategoryTreeModel>();
            var tree = new Dictionary<int, List<CategoryTreeModel>>();
            foreach (var category in allCategories)
            {
                List<CategoryTreeModel> childList;
                var model = new CategoryTreeModel()
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description
                };

                if (!tree.TryGetValue(category.ParentId, out childList))
                {
                    tree[category.ParentId] = childList = new List<CategoryTreeModel>();
                }
                childList.Add(model);
                if (!tree.TryGetValue(category.Id, out childList))
                {
                    tree[category.Id] = childList = new List<CategoryTreeModel>();
                }
                model.Children = childList;
            }
            if (!tree.TryGetValue(0, out resultList))
            {
                return new ResponseModel<List<CategoryTreeModel>>(false, resultList);
            }
            return new ResponseModel<List<CategoryTreeModel>>(true, resultList);
        }

        public async Task<ResponseModel<CategoryModel>> GetCategory(int id)
        {
            var category = await _categoryReposytory.GetById(id);
            var model = new CategoryModel()
            {
                Id = category.Id,
                Name = category.Name,
                ParentId = category.ParentId,
                Description = category.Description
            };
            return new ResponseModel<CategoryModel>(true, model);
        }
    }
}

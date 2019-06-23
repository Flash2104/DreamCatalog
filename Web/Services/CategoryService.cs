using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Interfaces.Repository;
using Web.Interfaces.Services;
using Web.Models.Response;

namespace Web.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _categoryReposytory;

        public CategoryService(IMapper mapper, ICategoryRepository categoryReposytory)
        {
            this._mapper = mapper;
            this._categoryReposytory = categoryReposytory;

        }

        public async Task<BaseResponse<List<CategoryTreeDto>>> ListAllCategories()
        {
            var allCategories = await _categoryReposytory.ListAll();
            var resultList = new List<CategoryTreeDto>();
            var tree = new Dictionary<int, List<CategoryTreeDto>>();
            foreach (var category in allCategories)
            {
                if (!category.Id.HasValue)
                {
                    continue;
                }
                List<CategoryTreeDto> childList;
                var model = _mapper.Map<CategoryTreeDto>(category);

                if (!tree.TryGetValue(category.ParentId, out childList))
                {
                    tree[category.ParentId] = childList = new List<CategoryTreeDto>();
                }
                childList.Add(model);
                if (!tree.TryGetValue(category.Id.Value, out childList))
                {
                    tree[category.Id.Value] = childList = new List<CategoryTreeDto>();
                }
                model.Children = childList;
            }
            if (!tree.TryGetValue(0, out resultList))
            {
                return new FailureResponse<List<CategoryTreeDto>>(new []{"Корневых категорий не найдено"});
            }
            return new SuccessResponse<List<CategoryTreeDto>>(resultList);
        }

        public async Task<BaseResponse<CategoryDto>> GetCategory(int id)
        {
            var category = await _categoryReposytory.GetById(id);
            if(category == null)
            {
                return new FailureResponse<CategoryDto>(new[] { $"Категории с id: {id} не найдено" });
            }
            return new SuccessResponse<CategoryDto>(_mapper.Map<CategoryDto>(category));
        }
    }
}

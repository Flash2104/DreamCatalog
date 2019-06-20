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

        public async Task<ResponseDto<List<CategoryTreeDto>>> ListAllCategories()
        {
            var allCategories = await _categoryReposytory.ListAll();
            var resultList = new List<CategoryTreeDto>();
            var tree = new Dictionary<int, List<CategoryTreeDto>>();
            foreach (var category in allCategories)
            {
                List<CategoryTreeDto> childList;
                var model = _mapper.Map<CategoryTreeDto>(category);

                if (!tree.TryGetValue(category.ParentId, out childList))
                {
                    tree[category.ParentId] = childList = new List<CategoryTreeDto>();
                }
                childList.Add(model);
                if (!tree.TryGetValue(category.Id, out childList))
                {
                    tree[category.Id] = childList = new List<CategoryTreeDto>();
                }
                model.Children = childList;
            }
            if (!tree.TryGetValue(0, out resultList))
            {
                return new ResponseDto<List<CategoryTreeDto>>(false, resultList);
            }
            return new ResponseDto<List<CategoryTreeDto>>(true, resultList);
        }

        public async Task<ResponseDto<CategoryDto>> GetCategory(int id)
        {
            var category = await _categoryReposytory.GetById(id);
            var model = new CategoryDto()
            {
                Id = category.Id,
                Name = category.Name,
                ParentId = category.ParentId,
                Description = category.Description
            };
            return new ResponseDto<CategoryDto>(true, model);
        }
    }
}

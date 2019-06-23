using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Data.Entities;
using Web.Interfaces.Repository;
using Web.Interfaces.Services;
using Web.Models.Response;
using Web.Models.Request;
using System.Linq.Dynamic;
using System;
using System.Linq;

namespace Web.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;

        public ProductService(
            IProductRepository productRepository,
            ICategoryRepository categoryRepository,
            IImageRepository imageRepository,
            IMapper mapper)
        {
            this._productRepository = productRepository;
            this._categoryRepository = categoryRepository;
            this._imageRepository = imageRepository;
            this._mapper = mapper;
        }

        public BaseResponse<ProductListDto> QueryList(ProductListQueryDto query)
        {
            var queriable = _productRepository.QueryAll();
            var categoryTreeIds = GetChildBranches(query.CategoryId);
            var total = _productRepository.Count(p => categoryTreeIds.Contains(p.CategoryId) || p.CategoryId == query.CategoryId);
            if (!string.IsNullOrEmpty(query.Sort?.Column))
            {
                if (query.Sort.IsAsc)
                {
                    queriable = queriable.OrderBy(query.Sort.Column);
                }
                else
                {
                    queriable = queriable.OrderBy(query.Sort.Column + " descending");
                }
            }
            var list = queriable.Where(p => categoryTreeIds.Contains(p.CategoryId) || p.CategoryId == query.CategoryId)
                .Skip(query.Skip).Take(query.Take).Select(e => _mapper.Map<ProductViewDto>(e)).ToList();

            return new SuccessResponse<ProductListDto>(new ProductListDto()
            {
                List = list,
                TotalElements = total
            });
        }

        private List<int> GetChildBranches(int categoryId)
        {
            var categories = this._categoryRepository.QueryAll().Select(c => new { c.Id, c.ParentId });
            var tree = new Dictionary<int, List<int>>();
            foreach (var category in categories)
            {
                if (!category.Id.HasValue)
                {
                    continue;
                }
                if (!tree.TryGetValue(category.ParentId, out var parentChildren))
                {
                    tree[category.ParentId] = parentChildren = new List<int>();
                }
                parentChildren.Add(category.Id.Value);
                if (!tree.TryGetValue(category.Id.Value, out var elChildren))
                {
                    tree[category.Id.Value] = elChildren = new List<int>();
                }
                parentChildren.AddRange(elChildren);
            }
            foreach (var kvp in tree)
            {
                CollectChildren(tree, kvp.Value, kvp.Key);
            }
            var result = tree[categoryId].Distinct().ToList();
            return result;
        }

        private void CollectChildren(Dictionary<int, List<int>> tree, List<int> parents, int current)
        {
            foreach (var p in parents.Distinct().ToList())
            {
                tree[current].AddRange(tree[p]);
                CollectChildren(tree, tree[p], p);
            }
        }

        //// https://stackoverflow.com/questions/307512/how-do-i-apply-orderby-on-an-iqueryable-using-a-string-column-name-within-a-gene
        //private IQueryable<T> OrderBy<T>(IQueryable<T> source, string ordering, string method)
        //{
        //    var type = typeof(T);
        //    var property = type.GetProperty(ordering);
        //    var parameter = Expression.Parameter(type, "p");
        //    var propertyAccess = Expression.MakeMemberAccess(parameter, property);
        //    var orderByExp = Expression.Lambda(propertyAccess, parameter);
        //    MethodCallExpression resultExp = Expression.Call(typeof(Queryable), method, new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExp));
        //    return source.Provider.CreateQuery<T>(resultExp);
        //}   

        public async Task<BaseResponse<ProductDto>> GetProduct(int id)
        {
            var dbModel = await _productRepository.GetById(id);
            if (dbModel == null)
            {
                return new FailureResponse<ProductDto>(new[] { "Продукт не найден" });
            }
            var model = _mapper.Map<ProductDto>(dbModel);
            if (dbModel.ImageId.HasValue)
            {
                var image = await _imageRepository.GetById(dbModel.ImageId.Value);
                model.Image = _mapper.Map<ImageDto>(image);
                model.Image.Base64String = Convert.ToBase64String(image.Buffer);
            }
            return new SuccessResponse<ProductDto>(model);
        }

        public async Task<BaseResponse<ProductDto>> CreateProduct(ProductUpdateRequestDto model)
        {
            var create = _mapper.Map<DbProduct>(model);
            try
            {
                await PrepareImage(model, create);
                var created = await _productRepository.Add(create);
                return new SuccessResponse<ProductDto>(_mapper.Map<ProductDto>(created));
            }
            catch (Exception ex)
            {
                return new FailureResponse<ProductDto>(new[] { "Ошибка при создании продукта", ex.Message });
            }
        }

        private async Task PrepareImage(ProductUpdateRequestDto model, DbProduct create)
        {
            if (model.Image != null && model.Image.Id == null)
            {
                var dbModel = _mapper.Map<DbImage>(model.Image);
                dbModel.Buffer = Convert.FromBase64String(model.Image.Base64String);
                var dbImage = await _imageRepository.Add(dbModel);
                create.ImageId = dbImage.Id;
            }
        }

        public async Task<BaseResponse<ProductDto>> UpdateProduct(ProductUpdateRequestDto model)
        {
            var update = _mapper.Map<DbProduct>(model);
            try
            {
                await PrepareImage(model, update);
                var updated = await _productRepository.Update(update);
                return new SuccessResponse<ProductDto>(_mapper.Map<ProductDto>(updated));
            }
            catch (Exception ex)
            {
                return new FailureResponse<ProductDto>(new[] { "Ошибка при обновлении продукта", ex.Message });
            }
        }

        public async Task<BaseResponse<int>> DeleteProducts(int[] ids)
        {
            try
            {
                var entities = new List<DbProduct>();
                foreach (var id in ids)
                {
                    entities.Add(await _productRepository.GetById(id));
                }
                var t = _productRepository.DeleteRange(entities);
                if (t.IsFaulted)
                {
                    return new FailureResponse<int>(new[] { "Ошибка при удалении продуктов", t.Exception?.Message });
                }
                await t;
                return new SuccessResponse<int>(ids.Length);
            }
            catch (Exception ex)
            {
                return new FailureResponse<int>(new[] { "Ошибка при удалении продуктов", ex.Message });

            }

        }
    }
}

using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Data.Entities;
using Web.Interfaces.Repository;
using Web.Interfaces.Services;
using Web.Models.Response;
using Web.Models.Request;
using System.Linq.Dynamic;
using System.Linq.Expressions;
using System;
using System.Linq;

namespace Web.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public ProductService(
            IProductRepository productRepository,
            ICategoryRepository categoryRepository,
            IMapper mapper)
        {
            this._productRepository = productRepository;
            this._categoryRepository = categoryRepository;
            this._mapper = mapper;
        }

        //public ResponseDto<List<ProductDto>> ListAll(int categoryId)
        //{
        //    var result = _productRepository.ListAll();
        //}

        public ResponseDto<ProductListDto> QueryList(ProductListQueryDto query)
        {
            var queriable = _productRepository.QueryAll();
            var categoryTreeIds = GetChildBranches(query.CategoryId);
            var total = _productRepository.Count(p => categoryTreeIds.Contains(p.CategoryId) || p.CategoryId == query.CategoryId);
            if (query.Sort != null && !string.IsNullOrEmpty(query.Sort.Column))
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
                .Skip(query.Skip).Take(query.Take).Select(e => _mapper.Map<ProductDto>(e)).ToList();

            return new ResponseDto<ProductListDto>(true, new ProductListDto()
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
                List<int> parentChildren, elChildren;
                if (!tree.TryGetValue(category.ParentId, out parentChildren))
                {
                    tree[category.ParentId] = parentChildren = new List<int>();
                }
                parentChildren.Add(category.Id);
                if (!tree.TryGetValue(category.Id, out elChildren))
                {
                    tree[category.Id] = elChildren = new List<int>();
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

        public async Task<ResponseDto<ProductDto>> CreateProduct(ProductUpdateRequestDto model)
        {
            var create = _mapper.Map<DbProduct>(model);
            var created = await _productRepository.Add(create);
            if (created == null)
            {
                return new ResponseDto<ProductDto>(false, null);
            }
            return new ResponseDto<ProductDto>(false, _mapper.Map<ProductDto>(created));
        }

        public async Task<ResponseDto<ProductDto>> UpdateProduct(ProductUpdateRequestDto model)
        {
            var update = _mapper.Map<DbProduct>(model);
            var updated = await _productRepository.Update(update);
            if (updated == null)
            {
                return new ResponseDto<ProductDto>(false, null);
            }
            return new ResponseDto<ProductDto>(false, _mapper.Map<ProductDto>(updated));
        }

        public async Task<ResponseDto<int>> DeleteProducts(int[] ids)
        {
            var entities = new List<DbProduct>();
            foreach (var id in ids)
            {
                entities.Add(await _productRepository.GetById(id));
            }
            var t = _productRepository.DeleteRange(entities);
            if (t.IsFaulted)
            {
                return new ResponseDto<int>(false, 0);
            }
            await t;
            return new ResponseDto<int>(true, ids.Length);
        }
    }
}

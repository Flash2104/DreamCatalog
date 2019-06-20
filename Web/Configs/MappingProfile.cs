using AutoMapper;
using Web.Data.Entities;
using Web.Models.Response;
using Web.Models.Request;

namespace Web.Configs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Product mapping
            CreateMap<DbProduct, ProductDto>();
            CreateMap<ProductDto, DbProduct>();

            //Product update mapping
            CreateMap<DbProduct, ProductUpdateRequestDto>();
            CreateMap<ProductUpdateRequestDto, DbProduct>();

            //Category mapping
            CreateMap<DbCategory, CategoryDto>();
            CreateMap<CategoryDto, DbCategory>();

            //Category tree mapping
            CreateMap<DbCategory, CategoryTreeDto>();

            //Image mapping
            CreateMap<DbImage, ImageDto>();
            CreateMap<ImageDto, DbImage>();
        }
    }
}

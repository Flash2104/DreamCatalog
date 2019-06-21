using Autofac;
using Web.Interfaces.Repository;
using Web.Interfaces.Services;
using Web.Repositories;
using Web.Services;

namespace Web.Configs
{
    public class RegistrationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ProductService>().As<IProductService>().InstancePerLifetimeScope();
            builder.RegisterType<CategoryService>().As<ICategoryService>().InstancePerLifetimeScope();
            builder.RegisterType<ProductRepository>().As<IProductRepository>().InstancePerLifetimeScope();
            builder.RegisterType<CategoryRepository>().As<ICategoryRepository>().InstancePerLifetimeScope();
            builder.RegisterType<ImageRepository>().As<IImageRepository>().InstancePerLifetimeScope();
        }
    }
}

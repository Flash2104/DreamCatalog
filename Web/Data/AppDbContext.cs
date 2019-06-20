using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Web.Data.Entities;

namespace Web.Data
{
    public class AppDbContext: DbContext
    {
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // configure builder for negotiations
            ConfigureCategoryProductBuilder(modelBuilder);
        }

        private void ConfigureCategoryProductBuilder(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<DbCategoryProduct>().HasKey(sc => new { sc.CategoryId, sc.ProductId });
            //modelBuilder.Entity<DbCategoryProduct>()
            //    .HasOne(un => un.Category)
            //    .WithMany(n => n.CategoryProducts)
            //    .HasForeignKey(un => un.CategoryId);
            //modelBuilder.Entity<DbCategoryProduct>()
            //    .HasOne(un => un.Product)
            //    .WithMany(n => n.CategoryProducts)
            //    .HasForeignKey(un => un.ProductId);
        }



        public DbSet<DbCategory> Categories { get; set; }

        public DbSet<DbProduct> Products { get; set; }

        public DbSet<DbImage> Images { get; set; }


        public override int SaveChanges()
        {
            AddAuitInfo();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            AddAuitInfo();
            return await base.SaveChangesAsync();
        }

        private void AddAuitInfo()
        {
            var entries = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && ( x.State == EntityState.Added || x.State == EntityState.Modified ));
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    ( (BaseEntity) entry.Entity ).Created = DateTime.UtcNow;
                }
                ( (BaseEntity) entry.Entity ).Modified = DateTime.UtcNow;
            }
        }
    }
}

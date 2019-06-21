using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Web.Data.Entities;

namespace Web.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.OpenConnection();
            try
            {
                if (!context.Images.Any())
                {
                    SeedImages(context);
                    context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Images ON");
                    context.SaveChanges();
                    context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Images OFF");
                }



                if (!context.Categories.Any())
                {
                    SeedCategories(context);
                    context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Categories ON");
                    context.SaveChanges();
                    context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Categories OFF");
                }


                if (!context.Products.Any())
                {
                    SeedProducts(context);
                    context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Products ON");
                    context.SaveChanges();
                    context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Products OFF");
                }

            }
            finally
            {
                context.Database.CloseConnection();
            }
            //context.SaveChanges();
        }

        private static void SeedImages(AppDbContext context)
        {
            var images = new List<DbImage>();
            var names = new string[]
            {
                "bottle.jpg",
                "iam.jpg",
                "matchbox.jpg",
                "radio.jpg",
                "tele.jpg"
            };
            for (int i = 0; i < 5; i++)
            {
                var path = "./Images/" + names[i];
                images.Add(new DbImage
                {
                    Id = i + 1,
                    Title = names[i],
                    Buffer = File.ReadAllBytes(path)
                });
            }
            context.Images.AddRange(images);
        }

        private static void SeedProducts(AppDbContext context)
        {
            var count = 10000;
            var categoryIds = new int[] { 5, 7, 8, 9, 10, 11 };
            var random = new Random();
            var products = new List<DbProduct>();
            for (int i = 1; i <= count; i++)
            {
                var categoryIndex = random.Next(0, 6);
                var categoryId = categoryIds[categoryIndex];
                var price = random.Next(100, 1000) + (decimal) random.NextDouble();
                var quantity = random.Next(10, 100);
                products.Add(new DbProduct()
                {
                    Id = i,
                    Title = _categories[categoryId].Name + " " + i,
                    CategoryId = categoryId,
                    Price = price,
                    Quantity = quantity,
                    ImageId = random.Next(1, 5)
                });
            }
            context.Products.AddRange(products);
        }

        private static void SeedCategories(AppDbContext context)
        {
            context.Categories.AddRange(_categories.Values);
        }

        private static Dictionary<int, DbCategory> _categories = new Dictionary<int, DbCategory>()
        {
            { 1, new DbCategory()
                {
                    Id = 1,
                    Name = "Одежда, обувь, аксессуары",
                    ParentId = 0
                } },
            {2,   new DbCategory()
                {
                    Id = 2,
                    Name = "Женская одежда",
                    ParentId = 1
                } },
            {3,    new DbCategory()
                {
                    Id = 3,
                    Name = "Мужская одежда",
                    ParentId = 1
                } },
            {4,   new DbCategory()
                {
                    Id = 4,
                    Name = "Верхняя",
                    ParentId = 2
                } },
            {5,   new DbCategory()
                {
                    Id = 5,
                    Name = "Плащи, тренчи",
                    ParentId = 4
                } },
            {6,   new DbCategory()
                {
                    Id = 6,
                    Name = "Одежда для спорта и танцев",
                    ParentId = 2
                } },
            {7,  new DbCategory()
                {
                    Id = 7,
                    Name = "Спортривная обувь",
                    ParentId = 6
                } },
            {8,    new DbCategory()
                {
                    Id = 8,
                    Name = "Спортивная форма",
                    ParentId = 6
                } },
             { 9,    new DbCategory()
                {
                    Id = 9,
                    Name = "Танцевальные туфли",
                    ParentId = 6
                } },
            {10,    new DbCategory()
                {
                    Id = 10,
                    Name = "Куртки",
                    ParentId = 3
                } },
            {11,   new DbCategory()
                {
                    Id = 11,
                    Name = "Зимняя обувь",
                    ParentId = 3
                } }
        };
    }
}

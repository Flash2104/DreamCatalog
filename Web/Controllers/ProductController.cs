using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // GET: api/ProductApi
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ProductApi/5
        [HttpGet("[action]/{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ProductApi
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ProductApi/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

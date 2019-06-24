using System.Collections.Generic;
using Web.Models.Response;

namespace Web.Controllers
{
    internal class FailureResponse : BaseResponse<ProductDto>
    {
        public FailureResponse(List<string> errors)
        {
            Errors = errors;
        }
    }
}
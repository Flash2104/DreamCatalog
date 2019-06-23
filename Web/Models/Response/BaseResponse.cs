using System.Collections.Generic;

namespace Web.Models.Response
{
    public abstract class BaseResponse<T>
    {
        public bool Success { get; protected set; }

        public T Data { get; protected set; }

        public IEnumerable<string> Errors { get; protected set; }
    }

    public class SuccessResponse<T> : BaseResponse<T>
    {
        public SuccessResponse(T data)
        {
            Success = true;
            Data = data;
        }
    }


    public class FailureResponse<T> : BaseResponse<T>
    {
        public FailureResponse(IEnumerable<string> errors)
        {
            Success = false;
            Errors = errors;
        }
    }
}

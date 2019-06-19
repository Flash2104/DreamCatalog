using System.Collections.Generic;

namespace Web.Models
{
    public class ResponseModel<T>
    {
        public bool Success { get; }

        public T Data { get; }

        public Dictionary<string, string> Errors { get; }

        public ResponseModel(bool success, T data)
        {
            Success = success;
            Data = data;
        }
    }
}

using System.Collections.Generic;

namespace Web.Models.Response
{
    public class ResponseDto<T>
    {
        public bool Success { get; }

        public T Data { get; }

        public Dictionary<string, string> Errors { get; }

        public ResponseDto(bool success, T data)
        {
            Success = success;
            Data = data;
        }
    }
}

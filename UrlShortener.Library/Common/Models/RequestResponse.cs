namespace UrlShortener.Library.Common.Models
{
    public class RequestResponse
    {
        public bool Successful { get; set; } = false;
        public string? Error { get; set; } = null;

        public static RequestResponse Success(int id = 0)
        {
            return new RequestResponse { Successful = true, Error = null };
        }

        public static RequestResponse Failure(string error, int id = 0)
        {
            return new RequestResponse { Successful = false, Error = error };
        }
    }
}

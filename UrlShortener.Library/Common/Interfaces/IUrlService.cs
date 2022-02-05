namespace UrlShortener.Library.Common.Interfaces
{
    public interface IUrlService
    {
        Task<Result<UrlResponse>> GetUsers();
        Task<Result<UrlResponse>> GetUser(int id);
        Task<RequestResponse> InsertUser(UrlResponse url);
        Task<RequestResponse> UpdateUser(UrlResponse url);
        Task<RequestResponse> DeleteUser(int id);
    }
}

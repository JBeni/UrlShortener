namespace UrlShortener.WebApi.Services
{
    public class UrlService : IUrlService
    {
        public Task<RequestResponse> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Result<UrlResponse>> GetUser(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Result<UrlResponse>> GetUsers()
        {
            throw new NotImplementedException();
        }

        public Task<RequestResponse> InsertUser(UrlResponse url)
        {
            throw new NotImplementedException();
        }

        public Task<RequestResponse> UpdateUser(UrlResponse url)
        {
            throw new NotImplementedException();
        }
    }
}

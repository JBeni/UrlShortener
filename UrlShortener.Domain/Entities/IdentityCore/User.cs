namespace UrlShortener.Domain.Entities.IdentityCore
{
    public class User : IdentityUser<int>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}

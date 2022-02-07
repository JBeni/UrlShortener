namespace UrlShortener.Domain.Entities
{
    public class Url : EntityBase
    {
        public string? OriginalUrl { get; set; }
        public string? ShortUrl { get; set; }
        public string? UrlKey { get; set; }
        public int Clicks { get; set; }
    }
}

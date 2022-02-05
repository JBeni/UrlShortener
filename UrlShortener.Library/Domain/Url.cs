namespace UrlShortener.Library.Domain
{
    public class Url : AuditableEntity
    {
        public string? OriginalUrl { get; set; }
        public string? ShortUrl { get; set; }
        public int Clicks { get; set; }
    }
}

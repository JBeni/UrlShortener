namespace UrlShortener.Domain.Entities
{
    public class Statistics : EntityBase
    {
        public string? UserAgentHeader { get; set; }
        public DateTime AccessedAt { get; set; }

        public Url Url { get; set; }
    }
}

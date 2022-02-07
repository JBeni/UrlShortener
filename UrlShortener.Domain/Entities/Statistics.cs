namespace UrlShortener.Domain.Entities
{
    public class Statistics : EntityBase
    {
        public string? BrowserUsed { get; set; }
        public string? OperatingSystemUsed { get; set; }
        public DateTime AccessedAt { get; set; }

        public Url Url { get; set; }
    }
}

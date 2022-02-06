namespace UrlShortener.Application.Responses
{
    public class UrlResponse : IMapFrom<Url>
    {
        public int Id { get; set; }
        public string? OriginalUrl { get; set; }
        public string? ShortUrl { get; set; }
        public string? UrlKey { get; set; }
        public int Clicks { get; set; }
        public DateTime Created { get; set; }
        public DateTime? LastModified { get; set; }

        void Mapping(Profile profile)
        {
            profile.CreateMap<Url, UrlResponse>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(x => x.OriginalUrl, opt => opt.MapFrom(x => x.OriginalUrl))
                .ForMember(x => x.ShortUrl, opt => opt.MapFrom(x => x.ShortUrl))
                .ForMember(x => x.UrlKey, opt => opt.MapFrom(x => x.UrlKey))
                .ForMember(x => x.Clicks, opt => opt.MapFrom(x => x.Clicks))
                .ForMember(x => x.Created, opt => opt.MapFrom(x => x.Created))
                .ForMember(x => x.LastModified, opt => opt.MapFrom(x => x.LastModified));
        }
    }
}

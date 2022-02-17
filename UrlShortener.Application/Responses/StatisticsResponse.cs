namespace UrlShortener.Application.Responses
{
    public class StatisticsResponse : IMapFrom<Statistics>
    {
        public int Id { get; set; }
        public int UrlId { get; set; }
        public string? UserAgentHeader { get; set; }
        public DateTime AccessedAt { get; set; }

        void Mapping(Profile profile)
        {
            profile.CreateMap<Statistics, StatisticsResponse>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(x => x.UrlId, opt => opt.MapFrom(x => x.Url.Id))
                .ForMember(x => x.UserAgentHeader, opt => opt.MapFrom(x => x.UserAgentHeader))
                .ForMember(x => x.AccessedAt, opt => opt.MapFrom(x => x.AccessedAt));
        }
    }
}

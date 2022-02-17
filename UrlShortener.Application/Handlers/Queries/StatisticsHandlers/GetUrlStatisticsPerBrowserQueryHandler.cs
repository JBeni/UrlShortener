namespace UrlShortener.Application.Handlers.Queries.StatisticsHandlers
{
    public class GetUrlStatisticsPerBrowserQuery : IRequest<Result<DataChartResponse>>
    {
        public int UrlId { get; set; }
    }

    public class GetUrlStatisticsPerBrowserQueryHandler : IRequestHandler<GetUrlStatisticsPerBrowserQuery, Result<DataChartResponse>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetUrlStatisticsPerBrowserQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<Result<DataChartResponse>> Handle(GetUrlStatisticsPerBrowserQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var statistics = _context.Statistics
                    .Where(x => x.Url.Id == request.UrlId)
                    .ProjectTo<StatisticsResponse>(_mapper.ConfigurationProvider)
                    .ToList();

                var chrome = statistics.Where(x => x.UserAgentHeader.Contains("Google Chrome")).Count();
                var edge = statistics.Where(x => x.UserAgentHeader.Contains("Microsoft Edge")).Count();
                var opera = statistics.Where(x => x.UserAgentHeader.Contains("Opera")).Count();
                var safari = statistics.Where(x => x.UserAgentHeader.Contains("Safari")).Count();
                var firefox = statistics.Where(x => x.UserAgentHeader.Contains("Firefox")).Count();

                var response = new List<DataChartResponse>()
                {
                    new DataChartResponse { Name = "Google Chrome", Value = chrome },
                    new DataChartResponse { Name = "Microsoft Edge", Value = edge },
                    new DataChartResponse { Name = "Opera", Value = opera },
                    new DataChartResponse { Name = "Safari", Value = safari },
                    new DataChartResponse { Name = "Mozilla Firefox", Value = firefox },
                };

                return Task.FromResult(new Result<DataChartResponse>
                {
                    Successful = true,
                    Items = response ?? new List<DataChartResponse>()
                });
            }
            catch (Exception ex)
            {
                return Task.FromResult(new Result<DataChartResponse>
                {
                    Error = $"Error occured when getting the url by Id. {ex?.Message}. {ex?.InnerException?.Message}"
                });
            }
        }
    }
}

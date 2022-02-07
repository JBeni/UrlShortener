namespace UrlShortener.Application.Handlers.Queries.StatisticsHandlers
{
    public class GetUrlStatisticsPerOSQuery : IRequest<Result<DataChartResponse>>
    {
        public int UrlId { get; set; }
    }

    public class GetUrlStatisticsPerOSQueryHandler : IRequestHandler<GetUrlStatisticsPerOSQuery, Result<DataChartResponse>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetUrlStatisticsPerOSQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<Result<DataChartResponse>> Handle(GetUrlStatisticsPerOSQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var statistics = _context.Statistics
                    .Where(x => x.Url.Id == request.UrlId)
                    .ProjectTo<StatisticsResponse>(_mapper.ConfigurationProvider)
                    .ToList();

                var windows = statistics.Where(x => x.OperatingSystemUsed.Contains("Windows")).Count();
                var linux = statistics.Where(x => x.OperatingSystemUsed.Contains("Linux") || x.OperatingSystemUsed.Contains("Ubuntu")).Count();
                var macOs = statistics.Where(x => x.OperatingSystemUsed.Contains("Mac OS") || x.OperatingSystemUsed.Contains("MacOS")).Count();

                var response = new List<DataChartResponse>()
                {
                    new DataChartResponse { Name = "Windows", Value = windows },
                    new DataChartResponse { Name = "Linux", Value = linux },
                    new DataChartResponse { Name = "Mac OS", Value = macOs }
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

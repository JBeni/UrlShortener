namespace UrlShortener.Application.Handlers.Commands.StatisticsHandlers
{
    public class CreateStatisticsCommand : IRequest<Result<StatisticsResponse>>
    {
        public int UrlId { get; set; }
        public string? BrowserUsed { get; set; }
        public string? OperatingSystemUsed { get; set; }
        public DateTime AccessedAt { get; set; }
    }

    public class CreateStatisticsCommandHandler : IRequestHandler<CreateStatisticsCommand, Result<StatisticsResponse>>
    {
        private readonly IApplicationDbContext _context;

        public CreateStatisticsCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<StatisticsResponse>> Handle(CreateStatisticsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var urlEntity = _context.Urls.FirstOrDefault(x => x.Id == request.UrlId);
                if (urlEntity == null) throw new Exception("The requested Url do not exists");

                var entity = new Statistics
                {
                    BrowserUsed = request.BrowserUsed,
                    OperatingSystemUsed = request.OperatingSystemUsed,
                    AccessedAt = request.AccessedAt,
                    Url = urlEntity
                };

                _context.Statistics.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);

                return new Result<StatisticsResponse> { Successful = true };
            }
            catch (Exception ex)
            {
                return new Result<StatisticsResponse>
                {
                    Error = $"Error occured when creating the statistics entry. {ex?.Message}. {ex?.InnerException?.Message}"
                };
            }
        }
    }
}

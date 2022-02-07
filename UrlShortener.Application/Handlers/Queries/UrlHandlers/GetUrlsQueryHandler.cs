namespace UrlShortener.Application.Handlers.Queries.UrlHandlers
{
    public class GetUrlsQuery : IRequest<Result<UrlResponse>>
    {
    }

    public class GetUrlsQueryHandler : IRequestHandler<GetUrlsQuery, Result<UrlResponse>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetUrlsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<Result<UrlResponse>> Handle(GetUrlsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var urls = _context.Urls
                    .ProjectTo<UrlResponse>(_mapper.ConfigurationProvider)
                    .ToList();

                return Task.FromResult(new Result<UrlResponse>
                {
                    Successful = true,
                    Items = urls ?? new List<UrlResponse>()
                });
            }
            catch (Exception ex)
            {
                return Task.FromResult(new Result<UrlResponse>
                {
                    Error = $"Error occured when getting the urls. {ex?.Message}. {ex?.InnerException?.Message}"
                });
            }
        }
    }
}

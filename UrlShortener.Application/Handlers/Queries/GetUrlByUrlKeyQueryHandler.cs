namespace UrlShortener.Application.Handlers.Queries
{
    public class GetUrlByUrlKeyQuery : IRequest<Result<UrlResponse>>
    {
        public string? UrlKey { get; set; }
    }

    public class GetUrlByUrlKeyQueryHandler : IRequestHandler<GetUrlByUrlKeyQuery, Result<UrlResponse>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetUrlByUrlKeyQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<UrlResponse>> Handle(GetUrlByUrlKeyQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var url = _context.Urls.FirstOrDefault(x => x.UrlKey == request.UrlKey);
                if (url == null) throw new Exception("The url does not exists");

                url.Clicks = url.Clicks + 1;

                _context.Urls.Update(url);
                await _context.SaveChangesAsync(cancellationToken);

                var newUrl = _mapper.Map<UrlResponse>(url);
                return new Result<UrlResponse>
                {
                    Successful = true,
                    Item = newUrl ?? new UrlResponse()
                };
            }
            catch (Exception ex)
            {
                return new Result<UrlResponse>
                {
                    Error = $"Error occured when getting the url by url key. {ex?.Message}. {ex?.InnerException?.Message}"
                };
            }
        }
    }
}

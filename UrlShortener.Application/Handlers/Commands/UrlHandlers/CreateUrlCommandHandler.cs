namespace UrlShortener.Application.Handlers.Commands.UrlHandlers
{
    public class CreateUrlCommand : IRequest<Result<UrlResponse>>
    {
        public string? OriginalUrl { get; set; }
        public string? EndpointUrl { get; set; }
    }

    public class CreateUrlCommandHandler : IRequestHandler<CreateUrlCommand, Result<UrlResponse>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateUrlCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<UrlResponse>> Handle(CreateUrlCommand request, CancellationToken cancellationToken)
        {
            try
            {
                if (!Uri.TryCreate(request.OriginalUrl, UriKind.Absolute, out var urlResult))
                {
                    throw new Exception("Url value is not a valid Url");
                }

                var urlKey = ShortId.Generate(new GenerationOptions { UseNumbers = true, UseSpecialCharacters = true, Length = 9 });
                var entity = new Url
                {
                    OriginalUrl = request.OriginalUrl,
                    ShortUrl = request.EndpointUrl + urlKey,
                    UrlKey = urlKey,
                    Clicks = 0
                };

                _context.Urls.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);

                var urlMapped = _mapper.Map<UrlResponse>(entity);

                return new Result<UrlResponse>
                {
                    Successful = true,
                    Item = urlMapped ?? new UrlResponse()
                };
            }
            catch (Exception ex)
            {
                return new Result<UrlResponse>
                {
                    Error = $"Error occured when creating the url entry. {ex?.Message}. {ex?.InnerException?.Message}"
                };
            }
        }
    }
}

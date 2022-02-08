namespace UrlShortener.Application.Handlers.Commands.UrlHandlers
{
    public class UpdateUrlCommand : IRequest<Result<UrlResponse>>
    {
        public int Id { get; set; }
        public string? EndpointUrl { get; set; }
    }

    public class UpdateUrlCommandHandler : IRequestHandler<UpdateUrlCommand, Result<UrlResponse>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public UpdateUrlCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<UrlResponse>> Handle(UpdateUrlCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var entity = _context.Urls.SingleOrDefault(d => d.Id == request.Id);
                if (entity == null) throw new Exception("The entity does not exist");

                var urlKey = ShortId.Generate(new GenerationOptions { UseNumbers = true, UseSpecialCharacters = true, Length = 9 });

                entity.ShortUrl = request.EndpointUrl + urlKey;
                entity.UrlKey = urlKey;
                entity.Clicks = 0;

                _context.Urls.Update(entity);
                var statistics = _context.Statistics.Where(x => x.Url.Id == request.Id).ToList();
                _context.Statistics.RemoveRange(statistics);
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
                    Successful = false,
                    Error = $"Error occured when updating the url entry. {ex?.Message}. {ex?.InnerException?.Message}"
                };
            }
        }
    }
}

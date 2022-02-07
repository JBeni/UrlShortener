namespace UrlShortener.Application.Handlers.Commands.UrlHandlers
{
    public class UpdateUrlCommand : IRequest<RequestResponse>
    {
        public int Id { get; set; }
        public string? EndpointUrl { get; set; }
    }

    public class UpdateUrlCommandHandler : IRequestHandler<UpdateUrlCommand, RequestResponse>
    {
        private readonly IApplicationDbContext _context;

        public UpdateUrlCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<RequestResponse> Handle(UpdateUrlCommand request, CancellationToken cancellationToken)
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

                return RequestResponse.Success();
            }
            catch (Exception ex)
            {
                return RequestResponse.Failure($"Error occured when updating the url entry. {ex?.Message}. {ex?.InnerException?.Message}");
            }
        }
    }
}

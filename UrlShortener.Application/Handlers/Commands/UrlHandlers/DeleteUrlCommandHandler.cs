namespace UrlShortener.Application.Handlers.Commands.UrlHandlers
{
    public class DeleteUrlCommand : IRequest<RequestResponse>
    {
        public int Id { get; set; }
    }

    public class DeleteUrlCommandHandler : IRequestHandler<DeleteUrlCommand, RequestResponse>
    {
        private readonly IApplicationDbContext _context;

        public DeleteUrlCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<RequestResponse> Handle(DeleteUrlCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var entity = _context.Urls.First(x => x.Id == request.Id);
                if (entity == null) throw new Exception("The entity does not exist");

                _context.Urls.Remove(entity);
                await _context.SaveChangesAsync(cancellationToken);

                return RequestResponse.Success();
            }
            catch (Exception ex)
            {
                return RequestResponse.Failure($"Error occured when deleting the url entry. {ex?.Message}. {ex?.InnerException?.Message}");
            }
        }
    }
}

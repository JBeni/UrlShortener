namespace UrlShortener.Application.Handlers.Queries
{
    public class GetUrlByIdQuery : IRequest<Result<UrlResponse>>
    {
        public int Id { get; set; }
    }

    public class GetUrlByIdQueryHandler : IRequestHandler<GetUrlByIdQuery, Result<UrlResponse>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetUrlByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<Result<UrlResponse>> Handle(GetUrlByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var url = _context.Urls
                    .ProjectTo<UrlResponse>(_mapper.ConfigurationProvider)
                    .FirstOrDefault(x => x.Id == request.Id);

                return Task.FromResult(new Result<UrlResponse>
                {
                    Successful = true,
                    Item = url ?? new UrlResponse()
                });
            }
            catch (Exception ex)
            {
                return Task.FromResult(new Result<UrlResponse>
                {
                    Error = $"Error occured when getting the url by Id. {ex?.Message}. {ex?.InnerException?.Message}"
                });
            }
        }
    }
}

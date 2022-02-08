namespace UrlShortener.Application.Handlers.Queries.UrlHandlers
{
    public class GetUrlsWithPaginationQuery : IRequest<PaginatedList<UrlResponse>>
    {
        public int Id { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetUrlsWithPaginationQueryHandler : IRequestHandler<GetUrlsWithPaginationQuery, PaginatedList<UrlResponse>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetUrlsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaginatedList<UrlResponse>> Handle(GetUrlsWithPaginationQuery request, CancellationToken cancellationToken)
        {
            return await _context.Urls
                .ProjectTo<UrlResponse>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}

namespace UrlShortener.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Url> Urls { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}

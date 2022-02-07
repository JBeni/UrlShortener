namespace UrlShortener.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Url> Urls { get; }
        DbSet<Statistics> Statistics { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}

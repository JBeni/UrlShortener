using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace UrlShortener.Library.Persistence
{
    public class UrlConfiguration : IEntityTypeConfiguration<Url>
    {
        public void Configure(EntityTypeBuilder<Url> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(t => t.OriginalUrl)
                .HasMaxLength(3000)
                .IsRequired();
            builder.Property(t => t.ShortUrl)
                .HasMaxLength(200)
                .IsRequired();
            builder.Property(t => t.Clicks)
                .IsRequired();
        }
    }
}

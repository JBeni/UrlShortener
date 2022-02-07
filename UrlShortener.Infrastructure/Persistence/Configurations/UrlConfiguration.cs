namespace UrlShortener.Infrastructure.Persistence.Configurations
{
    public class UrlConfiguration : IEntityTypeConfiguration<Url>
    {
        public void Configure(EntityTypeBuilder<Url> builder)
        {
            builder.ToTable("Urls");
            builder.HasKey(x => x.Id);

            builder.Property(t => t.OriginalUrl)
                .HasMaxLength(3000)
                .IsRequired();
            builder.Property(t => t.ShortUrl)
                .HasMaxLength(100)
                .IsRequired();
            builder.Property(t => t.UrlKey)
                .HasMaxLength(100)
                .IsRequired();
            builder.Property(t => t.Clicks)
                .IsRequired();
        }
    }
}

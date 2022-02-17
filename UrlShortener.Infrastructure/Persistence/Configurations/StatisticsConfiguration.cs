namespace UrlShortener.Infrastructure.Persistence.Configurations
{
    public class StatisticsConfiguration : IEntityTypeConfiguration<Statistics>
    {
        public void Configure(EntityTypeBuilder<Statistics> builder)
        {
            builder.ToTable("Statistics");
            builder.HasKey(x => x.Id);

            builder.Property(t => t.UserAgentHeader)
                .HasMaxLength(200)
                .IsRequired();
            builder.Property(t => t.AccessedAt)
                .IsRequired();
        }
    }
}

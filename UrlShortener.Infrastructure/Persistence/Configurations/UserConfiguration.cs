namespace UrlShortener.Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("AppUsers");

            builder.Property(x => x.FirstName)
                .HasMaxLength(100)
                .IsRequired();
            builder.Property(x => x.LastName)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(x => x.UserName)
                .HasMaxLength(250)
                .IsRequired();
            builder.Property(x => x.NormalizedUserName)
                .HasMaxLength(250)
                .IsRequired();
            builder.Property(x => x.Email)
                .HasMaxLength(150)
                .IsRequired();
            builder.Property(x => x.NormalizedEmail)
                .HasMaxLength(150)
                .IsRequired();
        }
    }
}

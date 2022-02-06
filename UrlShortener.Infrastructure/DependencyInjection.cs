namespace UrlShortener.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureLayer(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("UrlShortener"));

            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            services.AddTransient<IDateTime, DateTimeService>();

            var builder = services.AddIdentityCore<User>();
            builder = new IdentityBuilder(builder.UserType, builder.Services);
            builder.AddEntityFrameworkStores<ApplicationDbContext>();

            return services;
        }
    }
}

namespace UrlShortener.Library
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDataBusinessLayer(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("UrlShortener"));

            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            services.AddTransient<IDateTime, DateTimeService>();

            return services;
        }
    }
}

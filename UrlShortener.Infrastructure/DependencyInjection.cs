namespace UrlShortener.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureLayer(this IServiceCollection services, IConfiguration configuration)
        {
            if (bool.Parse(configuration["UseInMemoryDatabase"]))
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase("UrlShortener"));
            }
            else
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(
                        configuration["ConnectionStrings:WebApiConnection"],
                        b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)
                ));
            }

            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            services.AddTransient<IDateTime, DateTimeService>();

            //var builder = services.AddIdentityCore<User>();
            //builder = new IdentityBuilder(builder.UserType, builder.Services);
            //builder.AddEntityFrameworkStores<ApplicationDbContext>();

            return services;
        }
    }
}

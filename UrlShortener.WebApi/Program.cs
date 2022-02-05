try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("EnableCORS", builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });

    builder.Services.AddDataBusinessLayer();
    builder.Services.AddHttpContextAccessor();

    builder.Services.AddControllers();
    builder.Services.AddTransient<IUrlService, UrlService>();

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseCors("TravelBlogPostCors");
    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");
        endpoints.MapControllers();
    });

    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

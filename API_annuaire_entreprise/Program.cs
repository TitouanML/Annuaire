using API_annuaire.API.Middleware;
using DotNetEnv;
using API_annuaire.Shared.Extensions;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.InjectDependencies();

// Ajout de la configuration CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Placez le middleware CORS AVANT le middleware d'API key
app.UseCors("AllowFrontend");

// Middleware de l'API key
app.UseApiKeyMiddleware();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

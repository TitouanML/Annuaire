using System.Security.Authentication;
using Microsoft.AspNetCore.Http;

namespace API_annuaire.API.Middleware;

public class ApiKeyMiddleware
{
    private readonly RequestDelegate _next;
    private const string ApiKeyName = "x-api-key";

    public ApiKeyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Ignorer les requêtes OPTIONS (préflight)
        if (HttpMethods.IsOptions(context.Request.Method))
        {
            context.Response.StatusCode = 200;
            await context.Response.CompleteAsync();
            return;
        }

        // Exclure les chemins pour Swagger et Uploads
        var isSwagger = context.Request.Path.ToString().ToLower().Contains("swagger");

        if (!isSwagger)
        {
            // Vérifier que l'API key est présente dans les headers
            if (!context.Request.Headers.TryGetValue(ApiKeyName, out var extractedApiKey))
            {
                throw new AuthenticationException("API Key was not provided.");
            }

            var apiKey = Environment.GetEnvironmentVariable("API_KEY") ??
                         throw new InvalidOperationException("Can't find API_KEY in environment variables.");

            if (!apiKey.Equals(extractedApiKey))
            {
                throw new AuthenticationException("Unauthorized client. API key invalid.");
            }
        }

        await _next(context);
    }
}

using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Microsoft.AspNetCore.Identity.UI.Services;
using API_annuaire.Shared.Data;
using API_annuaire.API.Administrators.Repositories;
using API_annuaire.API.Administrators.Services;
using API_annuaire.API.Services.Services;
using API_annuaire.API.Services.Repositories;
using API_annuaire.API.Sites.Services;
using API_annuaire.API.Sites.Repositories;
using API_annuaire.API.Employees.Services;
using API_annuaire.API.Employees.Repositories;

namespace API_annuaire.Shared.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static void InjectDependencies(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            builder.Services.AddHttpContextAccessor();
            builder.AddServices(); // Injection des services
            builder.AddRepositories(); // Injection des repositories
            builder.AddJWT(); // Configuration de l'authentification JWT
            builder.AddSwagger(); // Configuration de Swagger
            builder.AddEFCoreConfiguration(); // Configuration de la base de données
        }

        public static void AddServices(this WebApplicationBuilder builder)
        {
            // Injection des services métiers
            builder.Services.AddScoped<IAdministratorService, AdministratorService>();
            builder.Services.AddScoped<IServiceService, ServiceService>();
            builder.Services.AddScoped<ISiteService, SiteService>();
            builder.Services.AddScoped<IEmployeeService, EmployeeService>();
        }

        public static void AddRepositories(this WebApplicationBuilder builder)
        {
            // Injection des repositories (gestion des accès aux données)
            builder.Services.AddScoped<IAdministratorRepository, AdministratorRepository>();
            builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
            builder.Services.AddScoped<ISiteRepository, SiteRepository>();
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        }

        public static void AddJWT(this WebApplicationBuilder builder)
        {
            // Récupération de la clé secrète JWT depuis les variables d'environnement
            var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET") ??
                            throw new InvalidOperationException("JWT secret 'JWT_SECRET' not found.");

            var key = Encoding.ASCII.GetBytes(jwtSecret);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false; // Mettre à true en production pour la sécurité
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false, // À activer si l'API a un émetteur spécifique
                        ValidateAudience = false, // À activer si l'API est utilisée par des clients spécifiques
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key) // Utilisation de la clé secrète pour signer les tokens
                    };
                });

            builder.Services.AddAuthorization();
        }

        public static void AddSwagger(this WebApplicationBuilder builder)
        {
            // Configuration de Swagger pour inclure l'authentification JWT
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });
        }

        public static void AddEFCoreConfiguration(this WebApplicationBuilder builder)
        {
            // Récupération de la chaîne de connexion depuis les variables d'environnement
            var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING")
                                   ?? throw new InvalidOperationException(
                                       "Connection string 'DATABASE_CONNECTION_STRING' not found.");

            // Configuration du contexte de base de données avec MySQL
            builder.Services.AddDbContext<AnnuaireEntrepriseContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
        }
    }
}

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
            builder.AddServices();
            builder.AddRepositories();
            builder.AddJWT();
            builder.AddSwagger();
            builder.AddEFCoreConfiguration();
        }

        public static void AddServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IAdministratorService, AdministratorService>();
            builder.Services.AddScoped<IServiceService, ServiceService>();
            builder.Services.AddScoped<ISiteService, SiteService>();
            builder.Services.AddScoped<IEmployeeService, EmployeeService>();

        }

        public static void AddRepositories(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IAdministratorRepository, AdministratorRepository>();
            builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
            builder.Services.AddScoped<ISiteRepository, SiteRepository>();
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        }

        public static void AddJWT(this WebApplicationBuilder builder)
        {
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
                    options.RequireHttpsMetadata = false; // Mettre à true en production
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false, // Configurer selon les besoins
                        ValidateAudience = false, // Configurer selon les besoins
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });

            builder.Services.AddAuthorization();
        }

        public static void AddSwagger(this WebApplicationBuilder builder)
        {
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
            var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING")
                                   ?? throw new InvalidOperationException(
                                       "Connection string 'DATABASE_CONNECTION_STRING' not found.");

            builder.Services.AddDbContext<AnnuaireEntrepriseContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
        }
    }
}
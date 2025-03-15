using System;
using System.Collections.Generic;
using API_annuaire.API.Administrators.Models;
using API_annuaire.API.Employees.Models;
using API_annuaire.API.Services.Models;
using API_annuaire.API.Sites.Models;
using Microsoft.EntityFrameworkCore;
using MonApi.Shared.Utils;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace API_annuaire.Shared.Data;

public partial class AnnuaireEntrepriseContext : DbContext
{
    public AnnuaireEntrepriseContext()
    {
    }

    public AnnuaireEntrepriseContext(DbContextOptions<AnnuaireEntrepriseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Administrator> Administrators { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<Site> Sites { get; set; }

    public void EnsureAdminExists()
    {
        try
        {
            if (!Administrators.Any()) // Vérifie s'il y a déjà un administrateur
            {
                var admin = new Administrator
                {
                    LastName = "Défaut",
                    FirstName = "Administrateur",
                    Email = "administrateur@annuaire.com",
                    Password = PasswordUtils.HashPassword("Annuaire2025.!", out var salt),
                    Salt = Convert.ToBase64String(salt),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                Administrators.Add(admin);
                SaveChanges();

                Console.WriteLine("✅ Administrateur par défaut ajouté !");
            }
            else
            {
                Console.WriteLine("ℹ️ Un administrateur existe déjà, aucune action nécessaire.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Erreur lors de l'insertion de l'administrateur : {ex.Message}");
        }
    }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING")
                                  ?? throw new InvalidOperationException(
                                      "Connection string 'DATABASE_CONNECTION_STRING' not found.");
        optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Administrator>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("administrator");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Salt)
                .HasMaxLength(255)
                .HasColumnName("salt");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("employee");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.ServiceId, "employee_service_FK");

            entity.HasIndex(e => e.SiteId, "employee_site_FK");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.LandlinePhone)
                .HasMaxLength(15)
                .HasColumnName("landline_phone");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.MobilePhone)
                .HasMaxLength(15)
                .HasColumnName("mobile_phone");
            entity.Property(e => e.ServiceId)
                .HasColumnType("int(11)")
                .HasColumnName("service_id");
            entity.Property(e => e.SiteId)
                .HasColumnType("int(11)")
                .HasColumnName("site_id");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Service).WithMany(p => p.Employees)
                .HasForeignKey(d => d.ServiceId)
                .HasConstraintName("employee_service_FK");

            entity.HasOne(d => d.Site).WithMany(p => p.Employees)
                .HasForeignKey(d => d.SiteId)
                .HasConstraintName("employee_site_FK");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("service");

            entity.HasIndex(e => e.Name, "name").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Site>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("site");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(100)
                .HasColumnName("zip_code");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

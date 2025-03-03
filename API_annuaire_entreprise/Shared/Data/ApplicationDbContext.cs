using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace MonApi.Shared.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING")
                ?? throw new InvalidOperationException("Connection string 'DATABASE_CONNECTION_STRING' not found.");
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}

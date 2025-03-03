using API_annuaire.API.Employees.Models;
using System;
using System.Collections.Generic;

namespace API_annuaire.API.Services.Models;

public partial class Service
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}

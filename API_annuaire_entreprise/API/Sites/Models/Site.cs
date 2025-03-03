using API_annuaire.API.Employees.Models;
using System;
using System.Collections.Generic;

namespace API_annuaire.API.Sites.Models;

public partial class Site
{
    public int Id { get; set; }

    public string City { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string ZipCode { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}

using System;
using System.Collections.Generic;
using API_annuaire.API.Services.Models;
using API_annuaire.API.Sites.Models;

namespace API_annuaire.API.Employees.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string LastName { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string? LandlinePhone { get; set; }

    public string? MobilePhone { get; set; }

    public string Email { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int ServiceId { get; set; }

    public int SiteId { get; set; }

    public virtual Service Service { get; set; } = null!;

    public virtual Site Site { get; set; } = null!;
}

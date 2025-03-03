using System;
using System.Collections.Generic;

namespace API_annuaire.API.Administrators.Models;

public partial class Administrator
{
    public int Id { get; set; }

    public string LastName { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }
}

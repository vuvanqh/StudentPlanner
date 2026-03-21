using System;
using System.ComponentModel.DataAnnotations;

namespace StudentPlanner.Core.Application.Authentication;

public record LoginResponseDto
{
    public bool Success { get; set; }

    //session
    public string Token { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }

    //data
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    [EmailAddress]
    public string? Email { get; set; } = null!;
}
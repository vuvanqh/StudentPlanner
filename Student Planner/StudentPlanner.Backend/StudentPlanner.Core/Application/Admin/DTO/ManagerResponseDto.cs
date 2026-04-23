namespace StudentPlanner.Core.Application.Admin.DTO;
public record ManagerResponseDto
{
    public Guid Id{get;set;}
    public string FirstName{get;set;}
    public string LastName{get;set;}
    public string Email{get;set;}
    public string? FacultyCode{get;set;}
    
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentPlanner.Core.Application.ServiceContracts;
using StudentPlanner.Core.Entities;

namespace StudentPlanner.UI.Controllers;

[Route("api/[controller]")]
[Authorize(Roles = nameof(UserRoleOptions.Admin))]
[ApiController]
public class FacultyController : ControllerBase
{
    private readonly IFacultyService _facultyService; 
    public FacultyController(IFacultyService facultyService)
    {
        _facultyService = facultyService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _facultyService.GetAllFaculties());
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetFacultyById(Guid id)
    {
        return Ok(await _facultyService.GetFacultyByIdAsync(id));
    }
}

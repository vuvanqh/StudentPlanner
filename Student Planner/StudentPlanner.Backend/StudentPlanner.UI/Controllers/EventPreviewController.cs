using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentPlanner.Core.Application.Events;
using StudentPlanner.Core.Application.Events.EventPreveiws;
using StudentPlanner.Core.Entities;
using System.Security.Claims;

namespace StudentPlanner.UI.Controllers;

[Route("api/event-preview")]
[ApiController]
public class EventPreviewController : ControllerBase
{
    private readonly IEventPreviewService _eventPreviewService;
    public EventPreviewController(IEventPreviewService eventPreviewService)
    {
        _eventPreviewService = eventPreviewService;
    }


    [HttpGet]
    public async Task<IActionResult> GetPreviews(DateTime? from, DateTime? to)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value;
        if (!Enum.TryParse<UserRoleOptions>(role, true, out var parsedRole))
            return BadRequest("Invalid role");

        return Ok((await _eventPreviewService.GetForUserAsync(new UserContext { Id = Guid.Parse(userId), Role = parsedRole }, new EventPreviewQuery { From = from, To = to })));
    }
}

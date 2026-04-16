using Microsoft.AspNetCore.SignalR;
using StudentPlanner.Core.Entities;
using System.Security.Claims;

namespace StudentPlanner.UI.Hubs;

public class EventRequestHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var roleClaim = Context.User?.FindFirst(ClaimTypes.Role)?.Value;

        if (Enum.TryParse<UserRoleOptions>(roleClaim, true, out var role) && role == UserRoleOptions.Admin)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "admins");
        }
    }
}

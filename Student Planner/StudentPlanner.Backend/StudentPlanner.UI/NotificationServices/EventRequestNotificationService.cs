using Microsoft.AspNetCore.SignalR;
using StudentPlanner.Core.Application.Notifications.ServiceContracts;
using StudentPlanner.Core.Entities;
using StudentPlanner.UI.Hubs;

namespace StudentPlanner.UI.NotificationServices;

public class EventRequestNotificationService : IEventRequestNotificationService
{
    private readonly IHubContext<EventRequestHub> _hub;
    public EventRequestNotificationService(IHubContext<EventRequestHub> hub)
    {
        _hub = hub;
    }
    public async Task EventRequestUpdated(Guid managerId)
    {
        await _hub.Clients.Group("admins").SendAsync("refreshEventRequests");
        await _hub.Clients.User(managerId.ToString()).SendAsync("refreshEventRequests");
    }
    public async Task NotifyEventRequestListChanged()
    {
        await _hub.Clients.Group("admins").SendAsync("refreshEventRequests");
    }
}

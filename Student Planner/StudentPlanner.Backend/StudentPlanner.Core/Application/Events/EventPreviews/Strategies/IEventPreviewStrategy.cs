namespace StudentPlanner.Core.Application.Events.EventPreveiws;

public interface IEventPreviewStrategy
{
    Task<IEnumerable<EventPreveiwDTO>> GetAsync(UserContext user, EventPreviewQuery query);
    bool CanHandle(UserContext user);
}

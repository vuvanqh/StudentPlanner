namespace StudentPlanner.Core.Application.Events.EventPreveiws;

public interface IEventPreviewService
{
    Task<IEnumerable<EventPreveiwDTO>> GetForUserAsync(UserContext user, EventPreviewQuery query);
}

using StudentPlanner.Core.Domain;
using StudentPlanner.Core.Domain.RepositoryContracts;

namespace StudentPlanner.Core.Application.PersonalEvents;

public class PersonalEventService : IPersonalEventService
{
    private readonly IPersonalEventRepository _personalEventRepo;
    private readonly PersonalEventPolicy _policy = new PersonalEventPolicy();
    public PersonalEventService(IPersonalEventRepository personalEventRepo)
    {
        _personalEventRepo = personalEventRepo;
    }
    public async Task<Guid> CreatePersonalEventAsync(Guid userId, CreatePersonalEventRequest request)
    {
        PersonalEvent personalEvent = request.ToPersonalEvent(userId);
        PersonalEventPolicy.EnsureValidEvent(personalEvent);
        await _personalEventRepo.AddAsync(personalEvent);
        return personalEvent.Id;
    }

    public Task DeletePersonalEventAsync(Guid userId, Guid eventId)
    {
        throw new NotImplementedException();
    }

    public Task<PersonalEventResponse?> GetEventByIdAsync(Guid userId, Guid eventId)
    {
        throw new NotImplementedException();
    }

    public Task<List<PersonalEventResponse>> GetEventsAsync(Guid userId)
    {
        throw new NotImplementedException();
    }

    public async Task UpdatePersonalEventAsync(Guid userId, Guid eventId, UpdatePersonalEventRequest request)
    {
        PersonalEvent? personalEvent = await _personalEventRepo.GetEventByEventIdAsync(eventId);

        if (personalEvent == null)
            throw new ArgumentException("Event does not exist.");
        if (personalEvent.UserId != userId) 
            throw new UnauthorizedAccessException("You do not have permission to access this event.");

        PersonalEventPolicy.EnsureValidEvent(personalEvent);
        await _personalEventRepo.UpdateAsync(personalEvent);
    }
}

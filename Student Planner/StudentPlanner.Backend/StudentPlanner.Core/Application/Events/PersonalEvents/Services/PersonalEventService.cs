using StudentPlanner.Core.Domain;
using StudentPlanner.Core.Domain.RepositoryContracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentPlanner.Core.Application.PersonalEvents;

public class PersonalEventService : IPersonalEventService
{
    private readonly IPersonalEventRepository _personalEventRepo;
    public PersonalEventService(IPersonalEventRepository personalEventRepo)
    {
        _personalEventRepo = personalEventRepo;
    }
    public async Task<Guid> CreatePersonalEventAsync(Guid userId, CreatePersonalEventRequest request)
    {
        if (request.Title == string.Empty)
            throw new ArgumentException("The title cannot be empty.");
        if (request.StartTime < DateTime.UtcNow.AddMinutes(-1))
            throw new ArgumentException("The start date cannot be in the past.");
        if (request.EndTime < request.StartTime)
            throw new ArgumentException("The end date must be after the start date.");

        PersonalEvent personalEvent = request.ToPersonalEvent(userId);
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

    public Task UpdatePersonalEventAsync(Guid userId, Guid eventId, UpdatePersonalEventRequest request)
    {
        throw new NotImplementedException();
    }
}

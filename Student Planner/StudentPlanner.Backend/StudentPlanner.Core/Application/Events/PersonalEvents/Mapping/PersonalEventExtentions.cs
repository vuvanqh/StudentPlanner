using StudentPlanner.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentPlanner.Core.Application.PersonalEvents;

public static class CreatePersonalEventRequestExtention
{
    public static PersonalEvent ToPersonalEvent(this CreatePersonalEventRequest request, Guid userId)
    {
        return new PersonalEvent()
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            EventDetails = new EventDetails()
            {
                Title = request.Title,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Location = request.Location,
                Description = request.Description
            }
        };
    }
}

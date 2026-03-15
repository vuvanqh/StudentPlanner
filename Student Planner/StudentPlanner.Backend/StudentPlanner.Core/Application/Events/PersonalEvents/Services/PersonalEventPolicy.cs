using StudentPlanner.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentPlanner.Core.Application.PersonalEvents;

public class PersonalEventPolicy
{
    public static void EnsureValidEvent(PersonalEvent e){
        if (e.EventDetails.Title == string.Empty)
            throw new ArgumentException("The title cannot be empty.");
        if (e.EventDetails.StartTime < DateTime.UtcNow.AddMinutes(-1))
            throw new ArgumentException("The start date cannot be in the past.");
        if (e.EventDetails.EndTime < e.EventDetails.StartTime)
            throw new ArgumentException("The end date must be after the start date.");
    }
    public void EnsureExists(Guid eventId) { }

}

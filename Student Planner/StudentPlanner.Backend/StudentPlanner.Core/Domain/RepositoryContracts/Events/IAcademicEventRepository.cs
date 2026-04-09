using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentPlanner.Core.Domain.RepositoryContracts;

public interface IAcademicEventRepository
{
    Task<AcademicEvent?> GetByIdAsync(Guid eventId);
    Task AddAsync(AcademicEvent academicEvent);
    Task UpdateAsync(AcademicEvent academicEvent);
    Task DeleteAsync(Guid eventId);
}

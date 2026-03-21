using StudentPlanner.Core.Entities;

namespace StudentPlanner.Core.Application;

public interface IJwtService
{
    string CreateToken(User user);
}

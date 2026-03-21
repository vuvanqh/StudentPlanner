using System.Threading.Tasks;

namespace StudentPlanner.Core.Application.Authentication;

public interface IAuthenticationService
{
    Task RegisterAsync(RegisterRequestDto request);
    Task<LoginResponseDto> LoginAsync(LoginRequestDto request);
    Task ForgotPasswordAsync(ForgotPasswordRequestDto request);
    Task ResetPasswordAsync(ResetPasswordRequestDto request);
}

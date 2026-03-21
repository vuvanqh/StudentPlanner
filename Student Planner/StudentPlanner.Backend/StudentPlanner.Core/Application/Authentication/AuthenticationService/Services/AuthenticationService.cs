using StudentPlanner.Core.Application.Authentication;
using StudentPlanner.Core.Application;
using StudentPlanner.Core.Entities;
using StudentPlanner.Core.Domain.RepositoryContracts;

namespace StudentPlanner.Core.Application.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly IIdentityService _identityService;
    private readonly IEmailService _emailService;
    private readonly IJwtService _jwtService;
    private readonly IUserRepository _userRepo;
    public AuthenticationService(IIdentityService identityService, IEmailService emailService, IJwtService jwtService,
        IUserRepository userRepo)
    {
        _identityService = identityService;
        _emailService = emailService;
        _jwtService = jwtService;
        _userRepo = userRepo;
    }


    public async Task<LoginResponseDto> LoginAsync(LoginRequestDto request)
    {
        var user = await _identityService.SignInAsync(request.Email, request.Password);
        // Placeholder token
        return new LoginResponseDto
        {
            Success = true,
            Token = _jwtService.CreateToken(user),
            ExpiresAt = DateTime.UtcNow.AddHours(2),
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email
        };
    }

    public async Task RegisterAsync(RegisterRequestDto request)
    {
        var existingUser = await _userRepo.GetUserByEmailAsync(request.Email);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName
        };

        await _identityService.RegisterUser(user, request.Password);    
    }

    public async Task ForgotPasswordAsync(ForgotPasswordRequestDto request)
    {
        User user = (await _userRepo.GetUserByEmailAsync(request.Email)) ?? throw new ApplicationException("Invalid operation.");
      
        var token = await _identityService.GeneratePasswordResetTokenAsync(user.Email);
        await _emailService.SendPasswordResetEmailAsync(request.Email, token);
        
    }

    public async Task ResetPasswordAsync(ResetPasswordRequestDto request)
    {
        User user = (await _userRepo.GetUserByEmailAsync(request.Email))?? throw new ApplicationException("Invalid operation.");
 
        await _identityService.ResetPasswordAsync(user.Email, request.Token, request.NewPassword);
    }
}

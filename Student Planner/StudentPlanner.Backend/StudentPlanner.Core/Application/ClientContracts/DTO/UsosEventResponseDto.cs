namespace StudentPlanner.Core.Application.ClientContracts.DTO;
public record UsosEventResponseDto
{
    public string Title { get; init; } = null!;
    public string StartTime { get; init; } = null!;
    public string EndTime { get; init; } = null!;
    public string CourseId { get; init; } = null!;
    public string ClassType { get; init; } = null!;
    public string GroupNumber { get; init; } = null!;
    public string? BuildingId { get; init; }
    public string? BuildingName { get; init; }
    public string? RoomNumber { get; init; }
    public string? RoomId { get; init; }
}
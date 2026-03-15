using StudentPlanner.Core.Application.PersonalEvents;
using System;
using System.Collections.Generic;
using System.Text;
using AutoFixture;
using Moq;
using StudentPlanner.Core.Domain.RepositoryContracts;
using StudentPlanner.Core.Domain;
using System.Runtime.CompilerServices;


namespace StudentPlanner.Tests;

public class PersonalEventTests
{
    private readonly IFixture _fixture;
    private readonly IPersonalEventRepository _personalEventRepo;
    private readonly Mock<IPersonalEventRepository> _personalEventRepoMock;
    public PersonalEventTests()
    {
        _fixture = new Fixture();
        _personalEventRepoMock = new Mock<IPersonalEventRepository>();
        _personalEventRepo = _personalEventRepoMock.Object;
    }

    #region Create Personal Event Tests
    [Fact]
    public async Task CreatePersonalEvent_ShouldCreateEvent_WhenRequestIsValid() {
        PersonalEvent? result = null;
        CreatePersonalEventRequest request = _fixture.Build<CreatePersonalEventRequest>()
            .With(t => t.StartTime, DateTime.UtcNow)
            .With(t => t.EndTime, DateTime.UtcNow.AddDays(1))
            .Create();

        Guid dummyUser = Guid.NewGuid();

        _personalEventRepoMock.Setup(t => t.AddAsync(It.IsAny<PersonalEvent>()))
            .Callback<PersonalEvent>(e => result = e);

        PersonalEventService personalEventService = new PersonalEventService(_personalEventRepo);
        Guid eventId = await personalEventService.CreatePersonalEventAsync(dummyUser, request);

        Assert.NotNull(result);
        Assert.Equal(request.Title, result.EventDetails.Title);
        Assert.Equal(dummyUser, result.UserId);
    }
    [Fact]
    public async Task CreateEvent_ShouldThrow_WhenEndDateBeforeEqualStartDate()
    {
        PersonalEventService personalEventService = new PersonalEventService(_personalEventRepo);

        CreatePersonalEventRequest request = _fixture.Build<CreatePersonalEventRequest>()
            .With(t => t.StartTime, DateTime.UtcNow)
            .With(t => t.EndTime, DateTime.UtcNow.AddDays(-1))
            .Create();
        
        Exception exception = await Assert.ThrowsAsync<ArgumentException>(()=> personalEventService.CreatePersonalEventAsync(Guid.NewGuid(), request));
        Assert.Equal("The end date must be after the start date.", exception.Message);
    }
    [Fact]
    public async Task CreateEvent_ShouldThrow_WhenTitleIsEmpty() {
        PersonalEventService personalEventService = new PersonalEventService(_personalEventRepo);

        CreatePersonalEventRequest request = _fixture.Build<CreatePersonalEventRequest>()
            .With(t => t.StartTime, DateTime.UtcNow)
            .With(t => t.EndTime, DateTime.UtcNow.AddDays(1))
            .With(t => t.Title, string.Empty)
            .Create();

        Exception exception = await Assert.ThrowsAsync<ArgumentException>(() => personalEventService.CreatePersonalEventAsync(Guid.NewGuid(), request));
        Assert.Equal("The title cannot be empty.", exception.Message);
    }
    [Fact]
    public async Task CreateEvent_ShouldThrow_WhenStartDateInPast() {
        PersonalEventService personalEventService = new PersonalEventService(_personalEventRepo);

        CreatePersonalEventRequest request = _fixture.Build<CreatePersonalEventRequest>()
            .With(t => t.StartTime, DateTime.UtcNow.AddDays(-1))
            .With(t => t.EndTime, DateTime.UtcNow.AddDays(1))
            .Create();

        Exception exception = await Assert.ThrowsAsync<ArgumentException>(() => personalEventService.CreatePersonalEventAsync(Guid.NewGuid(), request));
        Assert.Equal("The start date cannot be in the past.", exception.Message);
    }
    #endregion
}

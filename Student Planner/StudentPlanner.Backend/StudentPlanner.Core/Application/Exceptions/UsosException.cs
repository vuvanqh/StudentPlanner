using System.Net;
namespace StudentPlanner.Core.Application.Exceptions;

public class UsosException : Exception
{
    public HttpStatusCode? StatusCode { get; }
    public string? ResponseError { get; }

    public UsosException() { }

    public UsosException(string message) : base(message) { }

    public UsosException(string message, HttpStatusCode? statusCode, string? responseError = null)
        : base(message)
    {
        StatusCode = statusCode;
        ResponseError = responseError;
    }

    public UsosException(string? message, Exception? innerException) : base(message, innerException) { }
}
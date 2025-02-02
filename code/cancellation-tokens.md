# Cancellation Tokens

Passing Cancellation Tokens to async tasks:

```csharp
public class SlowRequestController : Controller
{
    private readonly ILogger _logger;

    public SlowRequestController(ILogger<SlowRequestController> logger)
    {
        _logger = logger;
    }

    [HttpGet("/slowtest")]
    public async Task<string> Get(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Starting to do slow work");

        // slow async action, e.g. call external api
        await Task.Delay(10_000, cancellationToken);

        var message = "Finished slow delay of 10 seconds.";

        _logger.LogInformation(message);

        return message;
    }
}
```

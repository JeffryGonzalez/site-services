# Lab 1 - Creating an API

(Fictional) Narrative:

We have been informed that "certain" people that have a problem need to *always* have their problem taken care of right away.

They haven't quite yet decided what the "predicate" is for *when* a certain problem should be elevated, but, to be honest, we have a guess.
It's that new director in manufacturing. The guy is a pain. But we'll wait for verification before we start doing anything at all in the Issue Tracker API.

There is going to be a tech assigned for these "VIP" folks and we may end up emailing or texting them when a problem in this category arises, but for now
they just want us to save it in a database or something.

But we want to get ready for this. We'll give you more details as they become available, but:

1. We don't want this to interfere with work or the performance of the IssueTracker API. 
2. We have no idea how much utilization this will get, but it seems important enough that we want to hedge our bets and make it so we can scale this
independently of the IssueTracker API anyhow.

For these reasons, we want this to be a separate API in the same solution as the IssueTracker. Nobody else should be calling this API but us, so let's 
not make it a big thing.

## Step 1 - Setup

Update your code with the instructor code, if you need to.

### Create a Branch
Commit your code and create a branch for the lab. The instructor will show you how. (It's weird to refer to myself as "the instructor" here, but it's what I make my kids call me, so...)

### Create a New Database in Postgres

We *could* use the IssueTracker database, but that could cause problems. So, let's create a new database on the same server called "vipproblems".

The Instructor(tm) will show you how.


## Create a New Solution, Api Project, and Test Project

We are going to use the command line and the `dotnet` CLI to create a solution and a couple of projects.

In Visual Studio CODE (not Visual Studio), open our class folder, and on the `/src/issues` folder, right click and select "open in integrated terminal".

A terminal will open in the bottom of the screen.

In the terminal, type the following:

### Create the Solution
```bash
mkdir VipIssueSolution
cd VipIssueSolution
dotnet new sln

```
### Create the Projects

In the same terminal window, run the following commands:

```bash
dotnet new webapi -o VipIssue.Api
dotnet new xunit -o VipIssue.Tests
dotnet sln add ./VipIssue.Api/
dotnet sln add ./VipIssue.Tests/
```


## Open the Solution in Visual Studio

Start up Visual Studio and open the solution `VipIssueSolution.sln`. You should see both projects in the Solution Explorer.

If you inspect the `program.cs` in the API project, you will notice that the defaults are to use minimal APIs. It does not add `services.AddControllers()`, nor call `app.MapServices()`, and there is no Controllers folder.

Prior to .NET 9, Controllers were the default. Now minimal APIs are the default.

> [!NOTE] This is circumstantial evidence that Microsoft is slowly pushing us to the Minimal API style.

### Set a Development Port and Remove HTTPs from the API.

We *could* have told this API to not enable HTTPs when we created it with the `dotnet new` command, but HTTPs is also the default. 

If we wanted to remove this:

1. Go to `launchsettings.json` in the `properties` folder and open it. 
2. Remove the `https` key and it's value from the configuration.

Your final `launchsettings.json` will look close to this:

```json :line-numbers
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": false,
      "applicationUrl": "http://localhost:5249",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}

```

Let's change the default port to something we can remember, like 1338.

Change the port you were randomly assigned (on line 8 in my code above) to 1338.


```json :line-numbers
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": false,
      "applicationUrl": "http://localhost:1339", // [!code focus]
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}

```
Since we removed HTTPs, also go into the `program.cs` file and remove the line around line 15 that says `app.UseHttpsRedirection()`

> [!NOTE] What *was that doing*? Do you remember?


## Getting Started with the *Real Work*

First, maybe open the provided `VipIssue.Api.http` file. The variable for the URL is wrong, so let's just replace everything with this:

```
@address = http://localhost:1339

GET {{address}}/weatherforecast/
Accept: application/json

###

```

Click the "send request" button/link above the `GET` request and you *should* get back a 200 response with some fake weather data.

> [!WARNING] Get something else?
> Did you change your address, above? Did you run your API (Ctrl+F5)

### The Lab "Proper".

Here's what we are thinking. The IssueTracker.Api, when an Employee submits a Problem, will "decide" if that should be sent to this API for notification.

They will make a request that looks like this:

> [!NOTE] You can replace your `VipIssue.Api.http` with this if you like.

```
@address = http://localhost:1339

POST {{address}}/vips/notifications
Content-Type: application/json

{
  "problem": "http://localhost:1339/problems/6bbe43c5-337a-4695-9875-a70985c8778a",
  "description": "My stuff is broken again! Help!"
}
```

Obviously, if you try to run this request now, it will give you a 404.

Brief description:

The request body has two properties:

- `problem`: This will be a link to the problem on the IssueTracker.Api. Our API doesn't support this yet, but we are working on it.
- `description`: Just the description from the problem the user submitted.

The response should be something like this:

```http
201 Created
Location: http://localhost:1339/vips/notifications/f2e1fc39-d568-431a-95f5-514afcaedd70
Content-Type: application/json

{
  "id": "f2e1fc39-d568-431a-95f5-514afcaedd70",
  "problem": "http://localhost:1339/problems/6bbe43c5-337a-4695-9875-a70985c8778a",
  "description": "My stuff is broken again! Help!",
  "status": "Pending"
}

```

Which means we should be able to `GET` this later, by issuing a request against the `Location` header, which should return the same response:

```http
GET http://localhost:1339/vips/notifications/f2e1fc39-d568-431a-95f5-514afcaedd70
Accept: application/json

```
Should return a `200 Ok` with the same response sent above.


## Your Mission: Choose Your Own

Using whatever approach you are most comfortable, can you implement this API?

You Can:

- Write Tests For This
- Use Controllers or Minimal APIs
- Save the data in the database we created (Just use Marten.AspNetCore so we don't have to create schema).

You Can Also:

- Verify in the incoming request on the POST. 
  - Both the `problem` and the `description` are required.

If the incoming request doesn't validate, you should return a `400 Bad Request` status code.

- For the `GET` request you handle that lets them retrieve the stored notification, you could create a Endpoint Filter that returns a 404 if it isn't in the database.

The instructor believes in you. You can do it!

But if you need help:

Here is a video of me doing it and talking through it some:

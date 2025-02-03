# Services Developer Testing

This class is for developers, and when I use the term "Developer Testing", I mean only this:

::: tip **Developer Testing Definition**
I define "Developer Testing" in a way to differentiate it from the common understanding of software testing. 

All I mean by this is that "developer testing is writing tests as we create the application, before the application or even feature is completed". 

When most people think of what a software tester does, it is some version of "Oh, they come in and make sure the thing works right". (Of course, there is *way* more to being a tester than that), but implicit in this is an "after the fact" aspect. Sort of like turning your homework in to be graded.

:::

## Application Development

The target audience for this class are developers working in the mode of "Application Developer". I'll define that as:

> Application Developers *apply* technology to produce business value.

In other words, I assume you are working at a company where your job is to create things (apps) that are *applications of technology" in support of the business venture. Which is to say, these techniques might not be appropriate or sophisticated enough if you are working on building something general purpose (as opposed to the specificty of an application) like a building an operating system, a database, an open (or closed) source library or framework for others to use. Those domains or *modes* require different skills and different approaches to testing. 

Application developers do a lot of *experimenting*. What I mean by that is if something the business needs technology-wise already exists, they should probably just buy and use that. Wherever you are working as an application developer, you are probably not doing things like creating a word processing application, or a web server. You are *applying* existing things to build new things that are unique to your domain. 

These means there are few  "best practices", and "subject matter experts". It also means we are rarely *done*. 

Software in enterprise environments is a process more than a project. We prefer to *iterate* quickly to arrive at the best solution as opposed to gathering some requirements, going into a private isolated fortress of solitude and emerging months or even years later with what we *think* the business needs. Working as an application developer means you are in conversation all the time with the stake holders, with the users, and even with the running code (through observability). You are experimenting and finding your way to the best solution, and the goal posts change all the time. The "business" changes direction, they acquire another company, regulatory changes happen, etc.

## Continuous Integration and Continuous (Deployment | Delivery) (CI/CD)

This iterative style of producing applications has been formalized in the practices of CI/CD. 

Let's not get lost in the jargon. What we *need* is the ability to iterate quickly; to develop applications in an ongoing loop of feedback from the stakeholders, the environments in which it will run, and the needs of our users.

In large enterprises, sometimes made of hundreds or even thousands of developers, we split into "teams" to to "divide and conquer". No single team of developers can hold all the business knowledge for the entire enterprise. We specialize, we might be on a team that handles e-mail communications for the company, we might be on a team that does inventory control, or a team that works on specialized HR-related software. Each of these teams is beholden to their own business area for continually iterating and improving their apps, meanwhile other teams rely on the services your app provides to do their thing. The team that creates the shopping cart *needs* the functionality of the team that does the inventory management. For the shopping cart team to succeed, there needs to be not only the *existence* of the inventory team, but it needs to be reliable, available, and consistent.

That "consistent" thing is challenging, and even an oxymoron, in a way. If the inventory team is iterating quickly, adding new functionality, improving their "state process", it will *always* change a different rate than any other application that is using it. One day your shopping cart service might be using version "1" of the inventory service, the next day, through no fault of your own, you might be using version "2" of the inventory service. And it has to keep working.

If our app is coupled to other apps that we don't control, don't own, and will change at a different rate than our own app, you can get into a real mess. The inventory team might *need* to elevate the latest change **now** because there is a bug that needs fixed, or a change that will save the company *millions*, but if they can't do that until every other service updates and is tested, it's a nightmare. This is sometimes called a :nose: "Distributed Monolith". That's a way of saying that we'd probably be better off if all the developers worked in the exact same code base and we deploy at the same time. Back to square one.

What would be *perfect*, if we can allow ourselves a moment of utopian dreaming, is if:

- Each time works completely autonomously from one another. They can deliver new versions (or roll back to previous deployments) any time they want, without impacting other services.
- New functionality can be added as needed, not by prognosticating into the future about what "might be good to have".
- Performance variations in other services don't degrade my service.
- Availability of other services doesn't impact my service's ability to work.
- Things like database schema changes *never* break my application, and we don't need layers of internal bureaucracy to get something like a new column added to our database.
- As developers, we can look back at the end of each day and see exactly what we have contributed, and do it with confidence.
- The code we write is about the area of the business we support. It is understandable in that domain, and doesn't borrow things from other parts of the business that are irrelevant to us.

That sounds great! We need a name for that. I'd suggest "**Abracadabra Development**", unless another, really kind of crappy name hadn't already been assigned to it. 

### Microservices

The problem with Microservices is really the name. How can you *not* read that and think it is *primarily* about the *size* of the service? (note: It isn't)

Microservices are:

- Aligned with business functionality. You and your team understands and *owns* everything in the repo.
- They "own" state and state process within the business. Apps do things with data over time. If you are the inventory team, your team and the app you create *owns* that data and how it is used.
- They are independently deployable by the team that owns them *at any time*.
    - This means they are *loosely* coupled.
    - They don't do things like share databases with other services
    - They prefer asynchronous messaging over synchronous RPC communication
    - Taken to the ultimate extreme, *even if your app disappears, no other app in the company breaks*

You are creating Microservices if all of those things are true. Creating small HTTP services that connect to a big shared database and expose and HTTP interface, while communicating with other services you don't own, no matter the "size" of your service, is **not** a Microservice. 

If you, as a developer, are bogged down in some sort of Kafka-esque "elevate process" that involves bridge-line chats with people from teams you've never even met, you aren't doing "Microservices". You might be providing amazing value for your company, but it's also stressful, slow, and not using you for what your creator intended: Writing awesome code and making the business more money (or reducing their liability so they don't lose money).

## What Does This Have To Do With Testing?

Everything. *If* we continue to write and test our code in a way that relies on being coupled to things we don't own, that we don't control, we are just cementing in bad architecture into our code base. You can say "Well, that's all well and good, and we'd like to be there someday, but we aren't yet, so..." but that is like saying "I'd like to run a marathon, but until I do, I'm not going to run, and I'm going to eat a bag of chips for dinner every night." You are doing *nothing* to get there, and worse, you are making it more of an obstacle to ever get there. 

::: tip :fire: Developer Testing Is Testing Like You Are Already Doing Microservices
Again (do I need to say it?) we aren't shooting for Microservices to build up our resume, or be buzzword compliant, or whatever. Microservices are just a crappy name given to an architecture that allows you and your team to have *developer joy*.
According to the [StackOverflow 2022 Developer Survey](https://stackoverflow.blog/2022/03/17/new-data-what-makes-developers-happy-at-work/), the **biggest** factor to developers reported in what makes them unhappy at work is "lack of productivity". That's even rated higher than salary or work-life balance. (interesting, both salary and work-life balance rate higher as factors that make them happy than productivity).

This blows my mind simply because you'd think the #1 thing our employers would want is for us to be more productive! While there is no universally accepted metrics for defining "productivity" among developers, most would agree that it would be something like "our ability to frequently produce and deliver quality code that is directly tied to the success of the business". 

That is about the best definition of what "Microservices" are *for* as any definition I've heard.
:::

So, some guidance on what that looks like (though it will take the entire course to really show this):

1. Don't let other teams code muddy the waters of your code.
2. Code (and test) against contracts, not implementations.
3. If the focus of your app is getting diluted, don't do it. Create another app.
4. Pay attention to the information we get from our own frustration.
    - Find your "zone" in writing code and try to live there. 
    - When annoying things pull you out of that zone, **address them**. 
    - Create mechanisms to annoy you when you've lost the plot (this is the point of pipelines).
      - I want my pipeline to annoy me by:
        - slowing down every time I push my code. 
        - to periodically fail tests if I am not using good testing practices.
    - Be a perfectionist about your local development environment. Get it tweaked out like you like it and *learn it*.
    - Treat every meeting or process with some outside authority that stands in the way of you doing your job as an obstacle.
      - There will always be *some* of this.
      - If you can't even *start* coding until you make 12 requests from 5 different people, something is *wrong*.

## How Much Testing Do You Need?

I hate this question because it is a *great* question, and there isn't a great objective answer. 

The best subjective answer is something like:

> You need enough tests that you and your team is confident that your code can be released into production.

Unsatisfying, right? And *really* open to abuse. On one hand, you could have a team that just does not give a darn, so no tests would be fine. On the other hand, you could care *too much** and bring your development to a near halt because of too much testing.

Another problem with too much testing is that it actually slows down *everything*:

- The time to release the feature / bug fix / whatever.
- The time in the pipelines running your tests
- And **perhaps most importantly** the time it takes to change the code under test in the future.

### The Darned "Testing Pyramid" Just Won't Die

I love Marten Fowler. Like, really appreciate him, think he's brilliant, and have learned a ton from him. However, there is one thing (out of thousands) he has put out there that has become a demon we must all battle. That is the notion of the [Testing Pyramid](https://martinfowler.com/bliki/TestPyramid.html).

You might not even *know* about this testing pyramid thing, but the thinking behind it forms the hidden ideology that is still present in our thoughts about testing.

One interpretation of the testing pyramid is that there are generally three levels of tests (by tests here, he means automated tests we can write as developers).

- Low Level Unit Tests
- (Higher Level) Service Tests
- (Even Higher Level) UI (or end-to-end) tests.

He says "Its essential point is that you should have many more low-level Unit Tests than high level [tests]".

This makes sense in *some* contexts or modes of development, and more so at some historical point in time for others.

The first problem is that we are *really* bad at defining our terms as developers. And even if we do, those terms change meaning over time.

Here's how I'd define this in terms of what we want to accomplish, as opposed to following some sort of dogma:

#### We Need To Verify Our App

We build apps because people use them and they expect them to behave a certain way. There are business and technical requirements that must be met. 

In building apps that are *services*, we want to make sure that the consumers of our service can accomplish what we want them to accomplish, and we want to ensure that we are interacting with other services (backing services) in accordance to their contracts (e.g., we are sending legitimate SQL to our database, we are using OIDC/Oauth2 for identity, etc.).

We need to verify this stuff *every time* we deploy or deliver a new version of our application. Nothing else matters quite as much as this. 

Our "app" in a Service Oriented (or Microservice) architecture is our "Unit" of functionality. 

The tests at this level are a sort of *invariant*. We can (and will) change how the bread is buttered, so to speak, but our consumers are relying on us always to be able to deliver buttered bread. 

We write tests that as closely as possible mimic how we expect our consumers to interact with our service. In the case of an HTTP API, that means our tests create HTTP requests and inspect the results in the framing of *scenarios* of usage we support with our app.

If a business scenario says that we have to support a scenario that allows a product in inventory to have an inventory adjustment applied to it, we write a test that details that scenario and *proves our system is capable of this*. 

What you call these tests isn't all that important. I have taken to referring to them using the terminology that a client of mine proposed, because it is as good as any: [System Tests](./types#system-tests)

Because even I am not arrogant enough to argue with Martin Fowler, I will agree with his testing pyramid as long as we replace "Unit Tests" with "System Tests". You should have a lot of them. This is our starting point. The meaning behind the word "Unit" in "Unit Tests" is usually something like "an isolated unit of functionality", meaning that it is distinct, and doesn't rely on code that changes at a different rate than our code. So, our System Tests will only involve our app (or "System's") code or things we control and own (that get deployed along with our application).


What Martin calls "Unit Tests", we'll keep. But we probably will have fewer of them than our System Tests. While valuable if applied correctly, Unit Tests *break encapsulation*. They rely more on *how* some work is accomplished as opposed to the "what" of a piece of software. This means that if you change the *how* (and you will), you also need to change the tests. **Even if the system is still behaving properly**. 

This is the #1 complaint I hear from developers about so-called "Unit Testing". 

> I hate unit tests because I'm just verifying something I know already works, *and* if I change it in the future, I also have to update all my tests -- *fictional very angry developer*

Unit Tests should usually be a *refactoring*. You notice some duplication in your application, and you want to *generalize* that process so you don't have to keep *re-writing it* and *re-testing it*. We will have examples of this in the class.

::: tip Trust Nose
Have you ever noticed how just about *every* Unit Testing tutorial uses some example of something you'd probably *never* write?
I've seen tutorials using things like "Implementing the Stack Data Structure Through Unit Tests". Or, the famous "Tracking Bowling Scores". Even I have used weird examples of bank accounts and stuff like that. I have not implemented a stack data structure since I passed my data structures class back in school. I've used the heck out of code that uses that data structure, but believe me, my clients do not want to pay me to write that kind of thing. This is part of what I mean about "modes" of software developers. If I use the `System.Collections.Generic.Stack<T>` class in .NET, *of course* the person (people?) that created that should have a *ton* of unit tests. They might have even designed it using "Test Driven Development". Thanks, team! Your stuff is so good that I'm willing to use it in my applications, taking a dependency on it, so I *don't have to create it **or** test it*!

The problem I see is that developers confuse the "modes". They *think* they are only a good developer if their code looks like the code you wrote in the Unit Testing course. But you end up writing tests that are coupled to other code. You start to see people trying to figure out things like "How do I mock the HTTP Context in a controller?", or "How do I mock the DataContext for Entity Framework?". The answer is (no matter what you find on the internet) is almost always **You Don't**. Do not mock or stub code you don't own. I could go on and on about this, but instead I'll demonstrate in the class.

In summary, though, generally think of Unit Tests (using the old-school definition) as a liability. Not an asset. 
:::
# Web API 200

## Defining an "App"

Functionally speaking, an "App" is a source code repository. One source code repository, with many deployments.

We use the term "app" so we don't have to say something more specific, like "a user interface, or a service, or a batch job".

For a moment, though, let's think about the notion of an "app", as a normal (e.g. non programmer) person would think of an "app". It is some program that does something, or some things. Usually the thing it does is focused on a specific task or related set of specific tasks. You might use Word to edit or create documents,
Visual Studio to write .NET code, etc.

Now we know, as developers, there is a lot of "things" going on behind the scenes of an "app". It's not just (usually) one big source code file. It certainly contains subroutines, functions, maybe classes and other data structures. The organization of the *implementation* of the app is of no importance to us as the user of the application. As a matter of fact, the implementation of that app will change over time, and sometimes we won't even notice. 

Ideally, as programmers, the best kind of app to create is one where you have some control of the "full stack". Perhaps you are building an user interface application, maybe using a framework like Angular. Using Angular we build an application that is *delivered* and *executes* within the web browser of every user of that app. An app like that will need, in the repository, at least the source code for that application, hopefully some tests. But then we'd also need some kind of "elevate" process. How do we, when we are ready for a release, get that compiled source code onto a web server somewhere where it will be accessible to the users of our app?

In the "old days", that would be someone else's job. Now, what we'd do in our our app's repository is define what our app needs to "run" (or in this case, be delivered) as part of our apps definition - the repository itself. We might have a `Dockerfile` that has the steps outlined to build our application, house it within a *container* that has a reasonably good and well-configured *web server* (maybe Nginx). 

In the "CD" portion of our pipeline would create a *delivery* of this container. 

> [!IMPORTANT]
> Every time our team creates a *delivery* in our CI/CD pipeline, we must be able to say, with confidence, this is "good to go". 
> To the best of our ability, this software meets the requirements, is "quality", and *could* become a release.

It is the job of the CI (Continuous Integration) portion of your pipeline to do a "final check", ensuring that only the highest quality software gets delivered.

Our apps expose a "surface" through which the users interact with our code and data. That surface, or "interface" might be a user interface, like with an Angular app ("User Interface", UI), or it might be an interface through which other programmers can use code to get some benefit from our code ("Application Programming Interface", API).

As application developers, we create these *interfaces* for specific use cases. 

## Testing Levels

In our path toward releasing code into the production environment, 

### Unit
### Unit Integration
### System
### System Integration

### Releases and Feature Flags


# Module Scope & Middleware

Every javascript file in the qhp-idp project is a [Node module](https://nodejs.org/api/modules.html). They are self-contained and IIFE wrapped (courtesy of Node) pieces of code that handle a specific task or set of related functionality. These
modules can expose objects, constructor functions or pretty much anything necessary to allow them to accomplish their task (Should probably define rules around this to reduce confusion).

[Middleware](http://expressjs.com/en/guide/using-middleware.html) is a term used by Express that represents a function that can be pushed into the req/res cycle pipeline. A piece of middleware is simply a function that handles or alters a request and/or
response. Some of the middleware in this application will be 3rd-party (such as cookie-parser, body-parser or morgan). While other middleware will be custom developed locally (such as our routes). Middleware
itself can be a Node module or a function defined within a module (or both).

# Hi-level Request-Response (Happy Path) Workflow

    CLIENT                                                          SERVER

              ========================                                              ============     ==============      ==============================      ===================================
               ReactJs Makes Request                                         ---->  [IN] NodeJs ---> [IN] ExpressJs ---> [IN] Route (basic node module) ---> [IN] Controller (basic node module) ----
              ========================                                              ============     ==============      ==============================      ===================================    |
                                                                                                                                                                                                    |
                                                                                                                                                                                                    |
                                                                            -------------------------------------------------------------------------------------------------------------------------
                                                                            |
                                                                            |
                                                                            |        ===============================================          ==========================     ======================
                                                                            ------>  Mongoose Models Instantiated (via pull from db)   ---->   Model manipulated & saved ---> Response.end(result)  ----
                                                                                     ===============================================          ==========================     ======================     |
                                                                                                                                                                                                        |
              ==========================                                                                                                                                                                |
               ReactJs Handles Response                                     <----------------------------------------------------------------------------------------------------------------------------
              ==========================

## ReactJs Makes Request

This is anything from requesting the react.js file via an embedded <script /> tag to clicking an <a /> tag, which results in a request being made to an API to retrieve the logged in user's auth token or
profile information.

## \[IN\] NodeJs

The IDP application is using the built-in [**http**](https://nodejs.org/api/http.html#http_http) module to listen on port 3000 (default) for requests. This is the only point of entry into the application (aside
from swagger, see swagger implementation elsewhere). When an http request reaches the hostmachine, on that port, the _http_ module creates a [**req**](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
and [**res**](https://nodejs.org/api/http.html#http_class_http_serverresponse) object. The **req** represents the incoming http request and the **res** object acts as an interface into the response
that will eventually be sent back to the requestor. The http server does no other processing at this point and instead just passes these two objects off to our express module (defined in app.js).

## \[IN\] ExpressJs

The implementation of our express module builds the express middleware pipeline that we intend to use. The file is organised into 3 main sections:

1. Pre-processing middleware
    These middleware will alter the request in some way (adding authentication, parsing the body of the request, etc)
2. Routing middleware
    These middleware will determine where to send the request and response objects to be processed by the application and will be wholly designed by our implementation team
3. Post-processing middleware
    These middleware will alter the response in some way (setting the status code to 500/404 in the case of an issue during processing or adding constant headers to the outgoing message, etc)

The main thing to note here is that by the time the request comes in, our pipeline has already been constructed the [internal] path that the request follows is not alterable. With our pipeline construction
we have built an assembly line. A request goes in one end and a response comes out the other. Should the request target a route we have defined, the request will continue as we see in the above diagram to the next
section, otherwise it will fall out the end of the assembly and likely be handled by the http module's error handling (defined at the end of server.js).

## \[IN\] Route (basic node module)

### The first route wins (and every route is a module).

The rule of thumb is that when a route matches and is executed, we do not enter another route with the same request. **Every** route is responsible for ending the request with a response,
no matter the outcome (500, 401, 200, etc). The routes are mapped by path (resource) and http verb (GET, POST, etc.). Every defined combination provides a middleware to handle the request (or at least alter/validate
the request before handing it off to the next middleware in the pipeline).

If a route's middleware intends to handle the request (as opposed to simply altering it) then it should do so through an API controller. This happens in the next section.

## \[IN\] Controller (basic node module)

Generally the controller:resource ratio will be 1:1. A controller is the "maintainer of state" for a given resource. It can query for a resource, create a resource, alter a resource or even delete a resource. From
the controller's perspective, it will do all of this through in-memory models/repositories. These models (unkown to the controller, will actually be defined by our ODM, Mongoose (seen next). The controller will do what
has been _requested_ of it, then end the response appropriately. For instance there is no body to a DELETE request as they are idempotent, a POST (aka create) request should respond with the newly generated object.
**Note:** Every controller, too, is a separate Node module.

## Mongoose Models Instantiated (via pull from db)

As said previously, the controller will be dealing with these models but has no inclination as to where or how they are stored/retrieved. Merely the controller requests a model be loaded into memory or created, etc.
These models themselves are defined within Mongoose by linking a _model name_ with a [Schema definition](http://mongoosejs.com/docs/guide.html). The Schema is defined within a module (1 schema per module). Every
[Model](http://mongoosejs.com/docs/models.html) is responsible for its own creation, update, destruction and query. Given we will be using [MongoDb](https://docs.mongodb.com/manual/crud/) as our database, we will query
with Mongo syntax. This should not be exposed outside of the Schema. Instead, the Schema (Model?) should expose more abstract methods for handling such requests. This helps to better hide the nature of the requests
from the controllers point of view (which will also allow for easy swapping of data store via testing or if a necessity arrives that we should need to swap out MongoDb altogether.

Instantiating the models is abstracted to represent querying for existing data or creating new data, either way, at this point, the controller now has the model in-memory and is ready to manipulate it in some way.

## Model manipulated & saved

The controller continues its processing of the "state" by manipulating the model in whichever way it deems necessary. This could be an update to existing fields, deletion of the model itself or simply filtering the
models in preparation for the response.

## Response.end(result)

At this point the result is reconciled and the controller brings the req/res cycle to an end by returning a response (200, 201, 401*, 500, etc.) with an appropriate body (where applicable).

## ReactJs Handles Response

The client now has the response and will process the result as necessary (display the filtered items, present the user a toast indicating the delete operation was successful**, updating client state, etc.)


>  *: 401 is misleading here as if there was an issue with authentication/authorization, many of the former steps would have been skipped.
>
> **: This is a contextual "success". It does not mean that the data was necessarily deleted from the system, only that the request responded with a 200 success, so there were no issues on the server.
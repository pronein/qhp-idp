# ./routes

Contained within this directory will be the modules responsible for handling the endpoints requested by our users. These are, effectively, linkage modules between our express entry points and
server-side controllers. All of this code could go in the express app (app.js) but we break out it for more readable file structures and unit testing capabilities. Express has one job:
    [IN] request, response

    1. Handle request object and send "finished" status|results
        or
    2. Ignore request and let it to continue along the chain until it reaches the outer most level and is handled (generally) as a 404. This can be thought of as being handled the same as javascript events are handledvvvv


    Client                                                                   Server
    ------------------------                                                 ------------------------
                                                                            [Node application launches (through server.js) and begins listening for all requests
                                                                             targeting http://idp.deluxe.com/*]

    [User navigates to http://idp.deluxe.com/ (GET)]

                                                                            [Node app receives request and hands it off to express (app.js)]

                                                                            [Express module initializes and (from top to bottom) begins trying to match the path
                                                                             to one of the defined routes that have been configured. The first match will be passed the
                                                                             request object to handle*]

                                                                            [All api routes are bypassed (as they are filtering on /api/*) but the default route
                                                                             matches the request and the module at routes/index.js is provided the request object
                                                                             to continue the transaction]

                                                                            [index.js sees this is a GET request matching / and prepares views/index.ejs** for the response]

                                                                            [index.ejs is transpiled into index.html and returned to the requestor]

                                                                            [Since the request was handled (via using the response object, the transaction is complete and
                                                                             no further processing happens on the server]

    [The user's browser receives the html and begins to
     render the page (extra processing may occur at this end
     dependendant upon implementation: angular, react, etc.)]

    [Further requests are auto-generated to pull the stylesheet,
     javascript links, etc. and the process is repeated]



     * Should no match be found, then the request would come back out of app.js and the processing would continue into server.js error handlers (found at the bottom of the file). These
     generally include responding with a 404 and additional logging (server-side).

     ** EJS is a templating engine (similar to Jade, asp.net and others). The template is rendered server-side, executing injected code to dynamically create aspects of the page before the final html is
     sent back to the requestor.



              ========================                                              ============     ==============      ==============================      ===================================
               ReactJs Makes Request                                         ---->  [IN] NodeJs ---> [IN] ExpressJs ---> [IN] Route (basic node module) ---> [IN] Controller (basic node module) ----
              ========================                                              ============     ==============      ==============================      ===================================    |
                                                                                                                                                                                                    |
                                                                                                                                                                                                    |
                                                                            -------------------------------------------------------------------------------------------------------------------------
                                                                            |
                                                                            |
                                                                            |        ===============================================          ==========================     ======================
                                                                            ------>  Mongoose Models Instantiated (via pull from db)   ---->   Model manipulated & saved ---> Response.Send(result)  ------
                                                                                     ===============================================          ==========================     ======================       |
                                                                                                                                                                                                          |
              ==========================                                                                                                                                                                  |
               ReactJs Handles Response                                     <------------------------------------------------------------------------------------------------------------------------------
              ==========================
# ./bin

This directory contains the "main", module entry point for our node js server. The server.js file is responsible for spinning up a web server to accomplish 3 main tasks

## Task 1: Listen for incoming requests and route them (where applicable) to their necessary targets

These targets may be valid endpoints or they may be non-existant. They may even be more direct queries for our front-end to render itself within the requestor's browser.
The main take-away here is that ALL calls will enter through this listener.

## Task 2: Server static files (where applicable)

The IDP application has two general categories of resource:
1. Static content
    a. This content contains images, style sheets, html/components, etc. Generally there is no more than an endpoint given for this request, such as when a user navigates to the page and
    the server is contacted with a request to server up the index.html webpage
2. Dynamic Content
    a. This content comes in the form of a the users request(s) targeting dynamic resources through our RESTful API.

## Task 3: Handle any pre-post req-resp manipulation to standardize all messages sent to and from the system.

By dealing with these issues at this level, we are much less likely to accidentally
alow a "bad state" to occur with in the module
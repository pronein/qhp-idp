# ./api

This directory represents our external API. Our "public" interface to the back-end. Any consumers of the IDP app will enter through here. This includes the ReactJS front-end we will write later.

## Directory Structure

### ./api/controllers

A controller will exist for each resource in our RESTful API.

Currently, the only "known" resource is the User resource. This represents an individual's account in the application. The base endpoint for this resource is /api/user

Potential other resources include:
* /api/idp
* /api/category
- /api/category/presentation
- /api/category/project
- /api/category/conference

### ./api/mocks

This directory will contain mock controllers used during the swagger phase of each resource iteration (see below). The mock controllers should be designed to return specific data to test edge cases and immediate cases where applicable.

### ./api/swagger

This is a swagger defined directory where we will keep our api specification (done as a swagger yaml file). If a new developer were to start on this project or we were to be consumed by a
"third party" developer, this would be the documentation we would provide so that they might integrate with us more smoothly. With this yaml, our entire, exposed API is mapped out so they can mock/test
their consumer before ever actually hitting our endpoint(s).

## Controller/Resource Iteration Workflow

When the time comes to work with a new resource, the workflow for doing such is as follows:

1. Launch the application as a swagger project
2. Use the swagger editor to flesh out the API for the given resource
3. Build the controller, hooked up, generically, to the swagger definition
4. Build a mock controller for the swagger definition to test edge/immediate cases
5. Fully implement the controller (hooking it back into the application where applicable

Working on an existing resource follows the same basic workflow, with the exception that there should already be a controller and mock controller to work with, though there may not be for
whatever the reason, in which case, treat the resource as a new resource and follow the above procedure.
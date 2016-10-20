# ./Views

This directory is for server-side views that still need to be processed before they are presented in response to a request. They are not static files from the servers perspective and thus are not found in ./public.
Given that our pre-process, template engine is EJS, this is where you will find all of those templates. This project however, is more concerned with using a SPA front end, so this directly will likely only have 1
template in it (index.ejs) which will contain our SPA.


The error.ejs is really just a debug-only page that is rendered only if an error occurs and that error is not handled by express. It should never be reachable in a production environment. Depending on the testing
engine (some, like qunit, require a test-runner page), a template could also be found here for that as well.
# ./config

This directory will contain any config files necessary for the application to function.

There will be, eventually, a number of configs found within this directory.

* Environment configs
    - These will store env-specific data such as connection strings, logging paths/levels, etc.
    - ODM configuration (how our mongoose driver will configure itself from the perspective of build-wide settings
    - Passport configuration setup(s) - These will be used to handle authentication (and potentially authorization) of user requests.

* Swager config(s)
    These are mostly internal configs (to swagger) and are likely to not be touched much, if at all, in the future (after establishing
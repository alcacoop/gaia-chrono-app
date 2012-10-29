Gaia Chrono App
===============

**Chrono** is a simple Gaia OpenWebApp coded as example in 
**"Hack on FirefoxOs"** talk during local LinuxDay2012 event.

**Chrono** uses volo as devtool to speed up development and
generate appcache manifest, Gaia UI Building Blocks to
style the app as a FirefoxOS native application and RequireJS
to split javascript code into modules and build a single production
file.

* Run and Install App: http://alcacoop.github.com/gaia-chrono-app
* Slides: http://learn.alcacoop.it/2012/LinuxDay/HackOnFirefoxOS

Volo Usage
----------

This web project has the following setup:

* www/ - the web assets for the project
    * index.html - the entry point into the app.
    * js/
        * app.js - the top-level config script used by index.html
        * app/ - the directory to store project-specific scripts.
        * lib/ - the directory to hold third party scripts.
* tools/ - the build tools to optimize the project.

To optimize, run:

    volo build

This will run the "build" command in the volofile that is in this directory.

That build command creates an optimized version of the project in a
**www-built** directory. The js/app.js file will be optimized to include
all of its dependencies.

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html

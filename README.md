To Use
------

Install by running

`npm i -g briandipalma/panoptes#2.1.0`

Then `cd` to the root of the JS code you wish to monitor.

Execute

`panoptes`

All JS file edits within the directory tree will now be picked up.

Errors generate console output, successful runs produce a single log line naming the changed file.

To Develop
----------

Firstly you must remove any installed version

`npm r -g panoptes`

If you want to make a PR to the repo fork it.
Clone the repo you wish to develop in.

`git clone <repo-url>`

Then `cd` into the repo directory.

Once inside the repo directory run

`npm link`

Now when you execute `panoptes` your local cloned repo will be used.

Work away.

# React + Typescript + Express web development starter

## Initial setup

Run `npm install` to install all dependencies from the package.json.

## Run your code

The simplest dev workflow is achieved with two separate processes constantly running:
* `npm run server-watch` - runs the backend application server, updates as server code is changed
* `npm run client-watch` - runs a hot-reloading server, updates as client code is changed and auto-reloads the browser

Then, visit `http://localhost:8080/webpack-dev-server`.


## Run tests
All tests (files with `.spec.ts` or `.spec.tsx`) can be run with `npm test`. 
As currently configured, you can only re-run _all_ tests. If they are very fast and you like to have them constantly going as you make changes, consider using `npm test-watch`.




# More information

## npm

All packages are managed with npm and live in the node_modules folder under the project root.
The package.json specifies which npm packages are installed as actual dependencies and development dependencies (e.g., for tests).

Typescript type definition files (.d.ts) are installed via npm - typically as `@types/package`, if it exists.
When installing a new library for use in code, you'll want to make sure it has a `@types/[name]` and install it too.
If it doesn't, you can still use it if you define your own type definition file (which is annoying work, so don't unless you really need to).


## Development Scripts
Npm is used to set up easy access to development scripts - e.g., run tests. These can be seen listed in the package.json under "scripts". Many of these reference the files in the scripts/ directory in this project's root.

### `npm run lint`
Run tslint against typescript files.

##### Configuration
This simply references the installed package 'tslint' to run linting against all ts or tsx files under the src directory.
This can be further configured by adding a `tslint.json` file in the project's root directory. More information at https://www.npmjs.com/package/tslint.

### `npm test`
Run tests with Mocha. Any file with a `.spec.ts` or `.spec.tsx` extension is considered to be a test.
Mocha is set up to run in `--ui tdd` mode (using `suite`, `test`, etc. instead of `describe`, `it`, etc.).

##### Configuration
This script first builds the webpack test bundle, and then uses the Mocha executable to run the `build/test/test.bundle.js` produced by webpack.
The test config for webpack is set up to bundle in many of the same ways that the client does, except to use `src/test/test_runner.js` as the entry point.
The `test_runner.js` file is where we've configured which files to bundle into the test bundle, where we say `.spec.ts` or `.spec.tsx`.

### `npm run test-watch`
Same as test, but runs through a watcher that will cancel and re-run the mocha process if any of the files needed by the test bundle are changed.

##### Configuration
This is done with a node script in `scripts/test-watch`.

### `npm run client-watch`
Runs a webpack dev server for the client bundles. This includes:
* Building the dev bundle, which produces all the files in `build/client`
* Watching for file changes and automatically rebundling
* Setting up a proxy server that hot reloads when the bundle changes

The dev server runs at http://localhost:8080/webpack-dev-server.
This always serves the `index.html` file from the `build/client` directory. For other server requests, a normal backend server must be running at localhost:3000 (e.g., with `npm run server`.)

##### Configuration
This takes advantage of `webpack-dev-server`, an npm module that does all the work.
This can actually be configured to a much greater degree than it currently is. For more information, see https://webpack.github.io/docs/webpack-dev-server.html.

### `npm run server`
Run the backend application server at http://localhost:3000.
Builds the server bundle in `build/server`, then starts a node process and runs that server bundle.

##### Configuration
The server bundle is configured by `webpack/server.js`. Most importantly, its entry point is `src/server/main.ts`, which sets up an express application on port 3000.

### `npm run server-watch`
Same as `npm run server`, but through a webpack watcher that rebundles and restarts the server process when server files are changed.

##### Configuration
This is done with a node script in `scripts/server-watch`.

### `npm run build-client`
Bundles the client files in production mode, and outputs to `build/`.

### `npm run build`
Bundles both the client and server files in production mode, and outputs to `build/`.



## webpack

Webpack is used for all code bundling in this project for client, server, and test code. Each has its own webpack config. Below are some notable parts of the current webpack configuration.

### Typescript compilation
Compiles `.ts` and `.tsx` typescript to javascript with the `awesome-typescript-loader`.
The server bundle only supports `.ts`.

### Less compilation, css bundling
Compiles less files to css, then bundles all css into a single file. In order for a given file to be bundled, it must be required by the component that requires it.
For example, `Hello.tsx` has the line `require("components/Hello.less");`, since that is where the Hello styles are used.

### Automatic injection of script tags
After bundling js files, automatically append a script tag for every chunk produced in the output in the `index.html`.

### Source maps
For easier debugging in the browser.

### Inline data with url-loader
Include images in the bundle by inlining their binaries. They must be required by the component rendering the image.
See `Hello.tsx` for an example.

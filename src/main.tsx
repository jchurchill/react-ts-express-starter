import * as React from "react";
import * as ReactDOM from "react-dom";

// Import the Hello component.
// We can reference it as "components/Hello" instead of the relative "./components/Hello"
// because we've told typescript that the "src" directory is a baseUrl that it should start
// import resolutions with.
import * as Hello from "components/Hello";

// This file is the entry point for our client application.
// This is what we told webpack to set up as the thing to run when the browser
// loads our js bundle. (See the config in base.js - entry)

// Render the Hello component into the <div id="app"></div> that's in our index.html
ReactDOM.render(
    <Hello.Component
        who="world"
    />,
    document.getElementById("app")
);
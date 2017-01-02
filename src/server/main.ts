import * as express from "express";

// This file is the entry point for our server application.
// This is what we told webpack to set up as the thing to run when the browser
// loads our js bundle. (See the config in server.js - entry)

const app = express();
const port = process.env.PORT || 3000;

// Allow files to be served from build/client.
app.use(express.static("build/client"));

// When getting a request to the root of the webpage, respond with index.html
app.get("/", function(req, res) {
    res.sendFile("/index.html", { root: "build/client" });
});

// Actually start the express app
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// To IMPORT something in NODE use --> require

const path = require("path");
const express = require("express");
const app = express(); // Created express application
const publicPath = path.join(__dirname, "..", "public");
// Path to public folder

const port = process.env.PORT || 3000;


// To start the server --> using a specific port --> message for when server is up
app.use(express.static(publicPath)); // Tell it to use public directory to serve up all of our static assets


// For when we get a 404 page not found --> the app will serve up index.html
// * --> to match all unmatched routes
app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
}); // If what the person requested isn't in the public folder --> give them back index.html

// 3000 is a server I can use wuth my MAC
app.listen(port, () => {
    console.log("Server is up");
}); // Start on port 3000 
// HEROKU provides me with an environment variable --> changes every time I deploy my app
// ^^ '--> so I can't write it statically


// THIS IS A PRODUCTION SERVER
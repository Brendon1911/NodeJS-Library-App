// Requirements
const express = require("express"),
      chalk = require("chalk"),
      debug = require("debug")("app"),
      morgan = require("morgan"),
      path = require("path"),
      port = process.env.PORT;

// Declare app
const app = express()

// Use Morgan
app.use(morgan("tiny"));

// Use public files
app.use(express.static(path.join(__dirname, "/public")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.listen(port, (req, res) => {
  debug(`Listening on port ${chalk.green(port)}...`);
});
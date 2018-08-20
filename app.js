// Requirements
const express = require("express"),
      chalk = require("chalk"),
      debug = require("debug")("app"),
      morgan = require("morgan"),
      port = process.env.PORT;

// Declare app
const app = express()

// Use Morgan
app.use(morgan("tiny"));

// Home route
app.get("/", (req, res) => {
  res.send("Hello from my library app!");
});

app.listen(port, (req, res) => {
  debug(`Listening on port ${chalk.green(port)}...`);
});
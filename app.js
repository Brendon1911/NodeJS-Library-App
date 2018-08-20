// Requirements
const express = require("express"),
      port = process.env.PORT;

// Declare app
const app = express()

// Home route
app.get("/", (req, res) => {
  res.send("Hello from my library app!");
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}...`);
});
// Require statements
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const port = process.env.PORT || 3000;

// Declare app
const app = express();

// Use Morgan
app.use(morgan('tiny'));

// Use public files
app.use(express.static(path.join(__dirname, '/public')));

// Use Bootstrap CSS
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));

// Use Bootstrap JS
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));

// Use jQuery
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// Use Popper.js
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd')));

// Index route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(port, (req, res) => {
  debug(`Listening on port ${chalk.green(port)}...`);
});

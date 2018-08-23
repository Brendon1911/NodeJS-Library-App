// Require statements
const express = require('express');

const chalk = require('chalk');

const debug = require('debug')('app');

const morgan = require('morgan');

const path = require('path');

const sql = require('mssql');

// Set port
const port = process.env.PORT || 3000;

// Declare app
const app = express();

// Navigation
const nav = [{ link: '/books', title: 'books' },
             { link: '/authors', title: 'authors' }];

// Require book routes
const bookRouter = require('./src/routes/bookRoutes')(nav);

// Require admin routes
const adminRouter = require('./src/routes/adminRoutes')(nav);

// Configure Azure database
const config = {
    user: 'library',
    password: '$cuderiaF40',
    server: 'node-library.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'Node-Library-App',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

sql.connect(config).catch(err => debug(err));

// Use Morgan
app.use(morgan('tiny'));

app.use((req, res, next) => {
  debug('My middleware');
  next();
});

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

// Set views directory
app.set('views', './src/views');

// Set Pug templating engine
app.set('view engine', 'ejs');

app.use('/books', bookRouter);

app.use('/admin', adminRouter);

// Index route
app.get('/', (req, res) => {
  res.render('index', {
    nav: [{ link: '/books', title: 'books' },
          { link: '/authors', title: 'authors' }],
    title: 'Node Library App'
  });
});

app.listen(port, (req, res) => {
  debug(`Listening on port ${chalk.green(port)}...`);
});

// Requirements
const express = require('express');

const bookRouter = express.Router();

const sql =require("mssql");

const debug = require('debug')('app:bookRoutes')

// Router function
function router (nav) {
  const books = [
    {
      title: 'The Subway Girls',
      genre: 'Historical Fiction',
      author: ' Susie Orman Schnall',
      read: false
    },
    {
      title: 'War',
      genre: 'Fantasy',
      author: 'Jennifer Anne Davis',
      read: false
    },
    {
      title: 'Sanctuary',
      genre: 'Science Fiction',
      author: 'Caryn Lix',
      read: false
    },
    {
      title: '1984',
      genre: 'Science Fiction',
      author: 'George Orwell',
      read: false
    },
    {
      title: 'Of Mice and Men',
      genre: 'Historical Fiction',
      author: 'John Steinbeck',
      read: false
    }
  ];
  
  // All books route
  bookRouter.route('/')
    .get((req, res) => {
      (async function query(){
        const request = new sql.Request();
      
      const { recordset } = await request.query('select * from books')
        .then((result) => {
          res.render('bookListView', 
          {
            nav,
            title: 'Node Library App',
            books: recordset
          });
        });
      }());
    });
  
  // Single book route
  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query (){
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = 
          await request.input('id', sql.Int, id)
            .query('select * from books where id = @id');
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView', 
        {
          nav,
          title: 'Node Library App',
          book: req.book
        });
    });
  return bookRouter;
}
  
module.exports = router;
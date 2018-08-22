const express = require("express");

const bookRouter = express.Router();

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

bookRouter.route('/')
  .get((req, res) => {
    res.render('bookListView', 
    {
      nav: [{ link: '/books', title: 'books' },
            { link: '/authors', title: 'authors' }],
      title: 'Node Library App',
      books
    });
  });
  
bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.render('bookView', 
    {
      nav: [{ link: '/books', title: 'books' },
            { link: '/authors', title: 'authors' }],
      title: 'Node Library App',
      book: books[id]
    });
  });
  
module.exports = bookRouter;
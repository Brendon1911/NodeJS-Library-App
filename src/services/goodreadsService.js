function goodreadsService () {
  function getBookById () {
    return new Promise((resolve, reject) => {
      resolve({ description: 'Our discription' });
    });
  }
  
  return { getBookById };
}

module.exports = goodreadsService();
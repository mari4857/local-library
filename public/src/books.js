function findAuthorById(authors, id) {
  // returns the author object that has the matching ID
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  // returns the book object that has the matching ID
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // returns an array with 2 arrays inside of it: 1st array with books that have been loaned out, 2nd with books that have been returned
  const booksReturned = [];
  const booksNotReturned = [];
  books.forEach((book) => book.borrows[0].returned ? booksReturned.push(book) : booksNotReturned.push(book));
  return [booksNotReturned, booksReturned];
};

function getBorrowersForBook({ borrows }, accounts) {
  // returns an array of all the transactions from the book's borrows key. Each transaction includes the related account info and the returned key
  let first10Borrows = borrows.slice(0, 10);
  return first10Borrows.map(borrow => {
    const account = accounts.find(a => a.id == borrow.id);
    return {...borrow, ...account};
  })
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

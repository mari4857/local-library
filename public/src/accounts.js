function findAccountById(accounts, id) {
  // returns the account object that has the matching ID
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  // returns a sorted array of objects, sorted alphabetically by last name
  return accounts.sort((nameA, nameB) => 
    nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  // returns a number that represents the number of times the account's ID appears in any book's borrow array
  const total = books.reduce((acc, book) => {
    const subtotal = book.borrows.filter(b => b.id == account.id).length;
    return acc + subtotal;
  }, 0)
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  // returns an array of books and authors that represents all books currently checked out by the given account
  const accountId = account.id;
  return books.filter(book => book.borrows.find(borrow => borrow.id == accountId && !borrow.returned))
  .map(book => {
    book.author = authors.find(author => author.id == book.authorId);
    return book
  });
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

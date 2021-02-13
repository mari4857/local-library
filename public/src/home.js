function getTotal(array) {
  // get total helper function
  return array.length;
}

function getTotalBooksCount(books) {
  // returns a number that represents the number of book objects inside of the array
  return getTotal(books);
}

function getTotalAccountsCount(accounts) {
  // returns a number that represents the number of account objects inside of the array
  return getTotal(accounts);
}

function getBooksBorrowedCount(books) {
  // returns a number that represents the number of books that are currently checked out of the library
  let total = 0;
  books.forEach((book) => book.borrows[0].returned ? null : total += 1);
  return total;
}

function getMostCommonGenres(books) {
  // returns an array with the 5 most common occurring genres, ordered from most common to least
  const genreCount = {};
  const genres = books.map(book => book.genre).forEach(book => genreCount[book] ? genreCount[book]++ : genreCount[book] = 1);
  const sortable = [];
  for (let count in genreCount) {
    sortable.push([count, genreCount[count]]);
  }
  const sortedGenreCount = sortable.sort((a, b) => {
    return b[1] - a[1];
  });
  const topFiveGenres = sortedGenreCount.slice(0, 5)
    .map((genre) => {
      const container = {};
      container["name"] = genre[0];
      container["count"] = genre[1];
      return container;
  })
  return topFiveGenres;
}

function getMostPopularBooks(books) {
  // returns an array containing five objects or fewer that represents the most popular books in the library
  const booksArray = books.map(book => {
    const bookContainer = {};
    bookContainer["name"] = book.title;
    bookContainer["count"] = book.borrows.length;
    return bookContainer;
  })
  .sort((a, b) => {
    return b.count - a.count;
  })
  .slice(0, 5)
  return booksArray;
}

function getMostPopularAuthors(books, authors) {
  // returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most
  const mostPopularBooks = getMostPopularBooks(books);
  const popularAuthors = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    for (let j = 0; j < mostPopularBooks.length; j++) {
      if (book.title === mostPopularBooks[j].name) {
        const authorContainer = {};
        authorContainer["name"] = book.authorId;
        authorContainer["count"] = mostPopularBooks[j].count;
        popularAuthors.push(authorContainer);
      }
    }
  }
  for (let i = 0; i < popularAuthors.length; i++) {
    const author = popularAuthors[i];
    for (let j = 0; j < authors.length; j++) {
      if (author.name === authors[j].id) {
        author.name = `${authors[j].name.first} ${authors[j].name.last}`
      }
    }
  }
  return popularAuthors.sort((a, b) => {
    return b.count - a.count;
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

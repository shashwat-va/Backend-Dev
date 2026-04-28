/**
 * Initial Books Data
 */

let books = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    description: 'A gripping tale of racial injustice and childhood innocence'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    description: 'A dystopian novel of totalitarianism and surveillance'
  },
  {
    id: 3,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    description: 'A romantic novel about marriage and social class'
  },
  {
    id: 4,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    description: 'A tale of wealth and love in the Jazz Age'
  },
  {
    id: 5,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    year: 1932,
    description: 'A futuristic society driven by pleasure and conformity'
  },
  {
    id: 6,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    year: 1951,
    description: 'A coming-of-age story of teenage alienation'
  },
  {
    id: 7,
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    year: 1847,
    description: 'A gothic romance on the Yorkshire moors'
  },
  {
    id: 8,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    year: 1937,
    description: 'An adventure of hobbits and treasures'
  }
];

let nextBookId = 9;

const getBooks = () => books;
const getBookById = (id) => books.find(b => b.id === id);
const addBook = (book) => {
  book.id = nextBookId++;
  books.push(book);
  return book;
};
const updateBook = (id, updates) => {
  const book = books.find(b => b.id === id);
  if (book) {
    Object.assign(book, updates);
  }
  return book;
};
const deleteBook = (id) => {
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };

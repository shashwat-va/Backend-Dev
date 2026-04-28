/**
 * Exercise 4: Authors Resource
 * Initial Authors Data with full CRUD operations
 */

let authors = [
  {
    id: 1,
    name: 'Harper Lee',
    birthYear: 1926,
    nationality: 'American',
    biography: 'Pulitzer Prize-winning author of To Kill a Mockingbird'
  },
  {
    id: 2,
    name: 'George Orwell',
    birthYear: 1903,
    nationality: 'British',
    biography: 'Political writer and author of 1984'
  },
  {
    id: 3,
    name: 'Jane Austen',
    birthYear: 1775,
    nationality: 'British',
    biography: 'Romantic novelist of the 19th century'
  },
  {
    id: 4,
    name: 'F. Scott Fitzgerald',
    birthYear: 1896,
    nationality: 'American',
    biography: 'American modernist writer'
  },
  {
    id: 5,
    name: 'Aldous Huxley',
    birthYear: 1894,
    nationality: 'British',
    biography: 'Author of Brave New World'
  },
  {
    id: 6,
    name: 'J.D. Salinger',
    birthYear: 1919,
    nationality: 'American',
    biography: 'Author of The Catcher in the Rye'
  },
  {
    id: 7,
    name: 'Emily Brontë',
    birthYear: 1818,
    nationality: 'British',
    biography: 'Gothic novelist and poet'
  },
  {
    id: 8,
    name: 'J.R.R. Tolkien',
    birthYear: 1892,
    nationality: 'British',
    biography: 'Fantasy author of The Lord of the Rings'
  }
];

let nextAuthorId = 9;

const getAuthors = () => authors;
const getAuthorById = (id) => authors.find(a => a.id === id);
const getAuthorByName = (name) => authors.find(a => a.name.toLowerCase() === name.toLowerCase());
const addAuthor = (author) => {
  author.id = nextAuthorId++;
  authors.push(author);
  return author;
};
const updateAuthor = (id, updates) => {
  const author = authors.find(a => a.id === id);
  if (author) {
    Object.assign(author, updates);
  }
  return author;
};
const deleteAuthor = (id) => {
  const index = authors.findIndex(a => a.id === id);
  if (index !== -1) {
    authors.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { 
  getAuthors, 
  getAuthorById, 
  getAuthorByName,
  addAuthor, 
  updateAuthor, 
  deleteAuthor 
};

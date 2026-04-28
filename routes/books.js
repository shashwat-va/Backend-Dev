/**
 * Books Routes
 * Exercise 1: Query parameter filtering
 * Exercise 3: Pagination
 * Exercise 5: Search by title
 */

const express = require('express');
const router = express.Router();
const booksData = require('../models/booksData');

/**
 * Exercise 1 & 3 & 5: GET /books
 * Features:
 * - Exercise 1: Filter by author and year query parameters
 * - Exercise 3: Pagination with page and limit query parameters
 * - Exercise 5: Search by title using q query parameter
 * 
 * Query parameters:
 * - author: filter by author name (case-insensitive, partial match)
 * - year: filter by publication year
 * - q: search books by title (case-insensitive, partial match)
 * - page: pagination page number (default: 1)
 * - limit: items per page (default: 10)
 */
router.get('/books', (req, res) => {
  let { author, year, q, page = 1, limit = 10 } = req.query;

  let filteredBooks = booksData.getBooks();

  // Exercise 1: Filter by author
  if (author) {
    filteredBooks = filteredBooks.filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  // Exercise 1: Filter by year
  if (year) {
    const yearNum = parseInt(year, 10);
    filteredBooks = filteredBooks.filter(book => book.year === yearNum);
  }

  // Exercise 5: Search by title
  if (q) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Exercise 3: Pagination
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
  const totalCount = filteredBooks.length;
  const totalPages = Math.ceil(totalCount / limitNum);

  res.json({
    data: paginatedBooks,
    pagination: {
      currentPage: pageNum,
      limit: limitNum,
      totalItems: totalCount,
      totalPages: totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1
    }
  });
});

/**
 * GET /books/:id
 * Get a single book by ID
 */
router.get('/books/:id', (req, res) => {
  const book = booksData.getBookById(parseInt(req.params.id, 10));

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json({ data: book });
});

/**
 * POST /books
 * Create a new book
 */
router.post('/books', (req, res) => {
  const { title, author, year, description } = req.body;

  // Basic validation
  if (!title || !author || !year) {
    return res.status(400).json({
      error: 'Title, author, and year are required'
    });
  }

  const yearNum = parseInt(year, 10);
  if (isNaN(yearNum) || yearNum < 1000 || yearNum > new Date().getFullYear()) {
    return res.status(400).json({
      error: `Year must be a number between 1000 and ${new Date().getFullYear()}`
    });
  }

  const newBook = booksData.addBook({ title, author, year: yearNum, description });
  res.status(201).json({ data: newBook });
});

/**
 * PUT /books/:id
 * Update a book
 */
router.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = booksData.getBookById(bookId);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const { title, author, year, description } = req.body;

  // Validate year if provided
  if (year) {
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum) || yearNum < 1000 || yearNum > new Date().getFullYear()) {
      return res.status(400).json({
        error: `Year must be a number between 1000 and ${new Date().getFullYear()}`
      });
    }
  }

  const updates = {};
  if (title) updates.title = title;
  if (author) updates.author = author;
  if (year) updates.year = parseInt(year, 10);
  if (description) updates.description = description;

  const updatedBook = booksData.updateBook(bookId, updates);
  res.json({ data: updatedBook });
});

/**
 * DELETE /books/:id
 * Delete a book
 */
router.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const deleted = booksData.deleteBook(bookId);

  if (!deleted) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json({ message: 'Book deleted successfully' });
});

module.exports = router;

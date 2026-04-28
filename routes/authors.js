/**
 * Exercise 4: Authors Resource
 * Full CRUD operations for authors
 */

const express = require('express');
const router = express.Router();
const authorsData = require('../models/authorsData');

/**
 * GET /authors
 * Get all authors
 */
router.get('/authors', (req, res) => {
  const authors = authorsData.getAuthors();
  res.json({ data: authors });
});

/**
 * GET /authors/:id
 * Get a single author by ID
 */
router.get('/authors/:id', (req, res) => {
  const author = authorsData.getAuthorById(parseInt(req.params.id, 10));

  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.json({ data: author });
});

/**
 * POST /authors
 * Create a new author
 */
router.post('/authors', (req, res) => {
  const { name, birthYear, nationality, biography } = req.body;

  // Validation
  if (!name || !birthYear || !nationality) {
    return res.status(400).json({
      error: 'Name, birthYear, and nationality are required'
    });
  }

  const birthYearNum = parseInt(birthYear, 10);
  const currentYear = new Date().getFullYear();

  if (isNaN(birthYearNum) || birthYearNum < 1000 || birthYearNum > currentYear) {
    return res.status(400).json({
      error: `Birth year must be between 1000 and ${currentYear}`
    });
  }

  // Check if author with same name already exists
  if (authorsData.getAuthorByName(name)) {
    return res.status(400).json({
      error: 'Author with this name already exists'
    });
  }

  const newAuthor = authorsData.addAuthor({
    name,
    birthYear: birthYearNum,
    nationality,
    biography
  });

  res.status(201).json({ data: newAuthor });
});

/**
 * PUT /authors/:id
 * Update an author
 */
router.put('/authors/:id', (req, res) => {
  const authorId = parseInt(req.params.id, 10);
  const author = authorsData.getAuthorById(authorId);

  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  const { name, birthYear, nationality, biography } = req.body;

  // Validate birthYear if provided
  if (birthYear) {
    const birthYearNum = parseInt(birthYear, 10);
    const currentYear = new Date().getFullYear();

    if (isNaN(birthYearNum) || birthYearNum < 1000 || birthYearNum > currentYear) {
      return res.status(400).json({
        error: `Birth year must be between 1000 and ${currentYear}`
      });
    }
  }

  // Check if new name conflicts with existing author
  if (name && name !== author.name) {
    if (authorsData.getAuthorByName(name)) {
      return res.status(400).json({
        error: 'Author with this name already exists'
      });
    }
  }

  const updates = {};
  if (name) updates.name = name;
  if (birthYear) updates.birthYear = parseInt(birthYear, 10);
  if (nationality) updates.nationality = nationality;
  if (biography) updates.biography = biography;

  const updatedAuthor = authorsData.updateAuthor(authorId, updates);
  res.json({ data: updatedAuthor });
});

/**
 * DELETE /authors/:id
 * Delete an author
 */
router.delete('/authors/:id', (req, res) => {
  const authorId = parseInt(req.params.id, 10);
  const deleted = authorsData.deleteAuthor(authorId);

  if (!deleted) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.json({ message: 'Author deleted successfully' });
});

module.exports = router;

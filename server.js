/**
 * Books API Server
 * Complete implementation of all 5 exercises
 */

const express = require('express');
const bodyParser = require('body-parser');
const { validateYear } = require('./middleware/validationMiddleware');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply validation middleware to book-related routes
app.use(validateYear);

// Routes
app.use('/', booksRoutes);
app.use('/', authorsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Books API Server running on http://localhost:${PORT}`);
  console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                    BOOKS API - Exercise Implementations                    ║
╠════════════════════════════════════════════════════════════════════════════╣
║ Exercise 1: Query parameter filtering (by author and year)                 ║
║ → GET /books?author=Harper&year=1960                                       ║
║                                                                            ║
║ Exercise 2: Input validation middleware                                    ║
║ → Validates year (number, 1000-current year) and pagination params         ║
║                                                                            ║
║ Exercise 3: Pagination with query parameters                              ║
║ → GET /books?page=1&limit=10                                              ║
║                                                                            ║
║ Exercise 4: Authors resource with full CRUD                               ║
║ → GET /authors, POST /authors, PUT /authors/:id, DELETE /authors/:id       ║
║                                                                            ║
║ Exercise 5: Search endpoint by title                                       ║
║ → GET /books?q=Mockingbird                                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║                           AVAILABLE ENDPOINTS                              ║
╠════════════════════════════════════════════════════════════════════════════╣
║ BOOKS:                                                                     ║
║   GET    /books                    - Get all books (with filters/search)   ║
║   GET    /books/:id                - Get book by ID                        ║
║   POST   /books                    - Create new book                       ║
║   PUT    /books/:id                - Update book                          ║
║   DELETE /books/:id                - Delete book                          ║
║                                                                            ║
║ AUTHORS:                                                                   ║
║   GET    /authors                  - Get all authors                       ║
║   GET    /authors/:id              - Get author by ID                      ║
║   POST   /authors                  - Create new author                     ║
║   PUT    /authors/:id              - Update author                        ║
║   DELETE /authors/:id              - Delete author                        ║
║                                                                            ║
║ HEALTH:                                                                    ║
║   GET    /health                   - API health status                     ║
╚════════════════════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;

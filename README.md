# Books API - Practice Exercises

A complete Node.js/Express API implementing all 5 practice exercises for RESTful API development.

## Project Structure

```
assignment 3/
├── middleware/
│   └── validationMiddleware.js    (Exercise 2)
├── models/
│   ├── booksData.js
│   └── authorsData.js              (Exercise 4)
├── routes/
│   ├── books.js                    (Exercises 1, 3, 5)
│   └── authors.js                  (Exercise 4)
├── server.js
├── package.json
└── README.md
```

## Installation

```bash
cd "assignment 3"
npm install
```

## Running the Server

### Start the server
```bash
npm start
```

### Start with auto-reload (requires nodemon)
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

---

## Exercise Implementations

### Exercise 1: Query Parameter Filtering

**Task:** Add query parameter filtering to GET all books endpoint to filter by author or year.

**Implementation:** [routes/books.js](routes/books.js#L1-L60)

**Features:**
- Filter by author (case-insensitive, partial match)
- Filter by year (exact match)
- Combine multiple filters
- Validation via middleware (Exercise 2)

**Examples:**

Get all books by a specific author:
```bash
curl "http://localhost:3000/books?author=Harper"
```

Get all books from a specific year:
```bash
curl "http://localhost:3000/books?year=1960"
```

Combine author and year filters:
```bash
curl "http://localhost:3000/books?author=Harper&year=1960"
```

---

### Exercise 2: Input Validation Middleware

**Task:** Implement input validation middleware that checks if year is valid and within reasonable range.

**Implementation:** [middleware/validationMiddleware.js](middleware/validationMiddleware.js)

**Features:**
- Validates year is a number
- Validates year is within range (1000 - current year)
- Validates pagination parameters (page, limit)
- Returns 400 Bad Request with descriptive error messages

**Validation Rules:**
- `year`: Must be integer between 1000 and current year
- `page`: Must be positive integer >= 1
- `limit`: Must be positive integer >= 1

**Error Response Example:**
```json
{
  "error": "Year must be between 1000 and 2026."
}
```

---

### Exercise 3: Pagination

**Task:** Add pagination to GET all books endpoint using query parameters like `?page=1&limit=10`.

**Implementation:** [routes/books.js](routes/books.js#L30-L50)

**Features:**
- `page` parameter (default: 1)
- `limit` parameter (default: 10)
- Returns pagination metadata
- Works with filters and search

**Response Format:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "year": 1960,
      "description": "..."
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 8,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

**Examples:**

Get first 5 books:
```bash
curl "http://localhost:3000/books?page=1&limit=5"
```

Get page 2 with 3 items per page:
```bash
curl "http://localhost:3000/books?page=2&limit=3"
```

Combine with filters:
```bash
curl "http://localhost:3000/books?author=Harper&page=1&limit=10"
```

---

### Exercise 4: Authors Resource with Full CRUD

**Task:** Create a new resource (authors) and implement full CRUD operations for it.

**Implementation:** [routes/authors.js](routes/authors.js) & [models/authorsData.js](models/authorsData.js)

**Features:**
- **CREATE (POST)**: Add new authors
- **READ (GET)**: Retrieve all authors or specific author by ID
- **UPDATE (PUT)**: Modify existing authors
- **DELETE**: Remove authors

#### Endpoints:

**GET /authors** - Get all authors
```bash
curl http://localhost:3000/authors
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Harper Lee",
      "birthYear": 1926,
      "nationality": "American",
      "biography": "Pulitzer Prize-winning author of To Kill a Mockingbird"
    }
  ]
}
```

**GET /authors/:id** - Get author by ID
```bash
curl http://localhost:3000/authors/1
```

**POST /authors** - Create new author
```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Stephen King",
    "birthYear": 1947,
    "nationality": "American",
    "biography": "Horror and science fiction author"
  }'
```

**PUT /authors/:id** - Update author
```bash
curl -X PUT http://localhost:3000/authors/1 \
  -H "Content-Type: application/json" \
  -d '{
    "biography": "Updated biography"
  }'
```

**DELETE /authors/:id** - Delete author
```bash
curl -X DELETE http://localhost:3000/authors/9
```

#### Validation:
- Name, birthYear, and nationality are required
- BirthYear must be between 1000 and current year
- Author names must be unique

---

### Exercise 5: Search Endpoint

**Task:** Add a search endpoint that allows searching books by title using a query parameter.

**Implementation:** [routes/books.js](routes/books.js#L25-L30)

**Features:**
- Search by title (case-insensitive, partial match)
- Works with pagination
- Can be combined with other filters
- Parameter: `q` (query)

**Examples:**

Search for books with "Mockingbird" in title:
```bash
curl "http://localhost:3000/books?q=Mockingbird"
```

Search for "the" in titles with pagination:
```bash
curl "http://localhost:3000/books?q=the&page=1&limit=5"
```

Search and filter by year:
```bash
curl "http://localhost:3000/books?q=the&year=1960"
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "year": 1960,
      "description": "A gripping tale of racial injustice and childhood innocence"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

## Testing All Exercises

### 1. Test Filtering (Exercise 1)
```bash
# Filter by author
curl "http://localhost:3000/books?author=Austen"

# Filter by year
curl "http://localhost:3000/books?year=1949"

# Combined filter
curl "http://localhost:3000/books?author=Orwell&year=1949"
```

### 2. Test Validation (Exercise 2)
```bash
# Invalid year (not a number)
curl "http://localhost:3000/books?year=invalid"

# Invalid year (out of range)
curl "http://localhost:3000/books?year=3000"

# Invalid pagination
curl "http://localhost:3000/books?page=abc"
```

### 3. Test Pagination (Exercise 3)
```bash
# Different page sizes
curl "http://localhost:3000/books?limit=2"
curl "http://localhost:3000/books?page=2&limit=3"
curl "http://localhost:3000/books?page=3&limit=2"
```

### 4. Test Authors CRUD (Exercise 4)
```bash
# Create author
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Isaac Asimov","birthYear":1920,"nationality":"American","biography":"Science fiction pioneer"}'

# Update author
curl -X PUT http://localhost:3000/authors/1 \
  -H "Content-Type: application/json" \
  -d '{"biography":"Updated biography"}'

# Delete author
curl -X DELETE http://localhost:3000/authors/9
```

### 5. Test Search (Exercise 5)
```bash
# Search by title
curl "http://localhost:3000/books?q=Great"
curl "http://localhost:3000/books?q=pride"
curl "http://localhost:3000/books?q=world"
```

---

## Sample Data

The API comes with 8 pre-loaded books and 8 pre-loaded authors:

**Books:**
- To Kill a Mockingbird (Harper Lee, 1960)
- 1984 (George Orwell, 1949)
- Pride and Prejudice (Jane Austen, 1813)
- The Great Gatsby (F. Scott Fitzgerald, 1925)
- Brave New World (Aldous Huxley, 1932)
- The Catcher in the Rye (J.D. Salinger, 1951)
- Wuthering Heights (Emily Brontë, 1847)
- The Hobbit (J.R.R. Tolkien, 1937)

**Authors:**
- Harper Lee (1926)
- George Orwell (1903)
- Jane Austen (1775)
- F. Scott Fitzgerald (1896)
- Aldous Huxley (1894)
- J.D. Salinger (1919)
- Emily Brontë (1818)
- J.R.R. Tolkien (1892)

---

## API Response Format

All successful responses follow this format:

**List/Read Operations:**
```json
{
  "data": [
    { "id": 1, "title": "...", ... }
  ]
}
```

**With Pagination:**
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 8,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

**Error Responses:**
```json
{
  "error": "Descriptive error message"
}
```

---

## HTTP Status Codes

- `200 OK` - Successful GET request
- `201 Created` - Successful POST/create
- `400 Bad Request` - Validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Key Features Summary

| Exercise | Feature | Endpoint | Query Params |
|----------|---------|----------|--------------|
| 1 | Author filtering | GET /books | `?author=...` |
| 1 | Year filtering | GET /books | `?year=...` |
| 2 | Input validation | All | Year/page/limit validation |
| 3 | Pagination | GET /books | `?page=...&limit=...` |
| 4 | Authors CRUD | /authors/* | Full CRUD operations |
| 5 | Title search | GET /books | `?q=...` |

---

## Notes

- All data is stored in memory and will be reset when the server restarts
- For production, replace with a database (MongoDB, PostgreSQL, etc.)
- Year validation allows 1000 to current year (2026)
- All text searches are case-insensitive
- Duplicate author names are prevented during creation/update

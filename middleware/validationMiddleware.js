/**
 * Exercise 2: Input Validation Middleware
 * Validates year parameter - checks if it's a valid number and within reasonable range
 */

const validateYear = (req, res, next) => {
  const { year, author } = req.query;

  // Validate year if provided
  if (year) {
    const yearNum = parseInt(year, 10);
    
    // Check if year is a valid number
    if (isNaN(yearNum)) {
      return res.status(400).json({
        error: 'Invalid year format. Year must be a number.'
      });
    }

    // Check if year is within reasonable range (1000 - current year)
    const currentYear = new Date().getFullYear();
    if (yearNum < 1000 || yearNum > currentYear) {
      return res.status(400).json({
        error: `Year must be between 1000 and ${currentYear}.`
      });
    }
  }

  // Validate pagination parameters if provided
  const { page, limit } = req.query;

  if (page) {
    const pageNum = parseInt(page, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({
        error: 'Page must be a valid positive number.'
      });
    }
  }

  if (limit) {
    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum < 1) {
      return res.status(400).json({
        error: 'Limit must be a valid positive number.'
      });
    }
  }

  next();
};

module.exports = { validateYear };

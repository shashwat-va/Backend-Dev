// movieBooking.js — plain JavaScript functions for Assignment 3
// Data shapes:
// Movie  -> { movieId, name, ticketPrice }
// User   -> { userId, name, userType }
// Booking-> { user, movies: [ { movie, quantity } ] }

function createMovie(movieId, name, ticketPrice) {
  if (!movieId || !name) throw new Error('movieId and name are required');
  if (typeof ticketPrice !== 'number' || ticketPrice < 0) throw new Error('ticketPrice must be a non-negative number');
  return { movieId, name, ticketPrice };
}

function createUser(userId, name, userType = 'standard') {
  if (!userId || !name) throw new Error('userId and name are required');
  const t = String(userType).toLowerCase();
  if (t !== 'standard' && t !== 'vip') throw new Error("userType must be 'standard' or 'vip'");
  return { userId, name, userType: t };
}

function createBooking(user) {
  if (!user || !user.userId) throw new Error('valid user required to create booking');
  return { user, movies: [] };
}

function addMovieToBooking(booking, movie, quantity = 1) {
  if (!booking || !booking.user) throw new Error('valid booking required');
  if (!movie || !movie.movieId) throw new Error('valid movie required');
  if (!Number.isInteger(quantity) || quantity <= 0) throw new Error('quantity must be a positive integer');

  const existing = booking.movies.find(m => m.movie.movieId === movie.movieId);
  if (existing) existing.quantity += quantity;
  else booking.movies.push({ movie, quantity });
  return booking;
}

function bookMultipleTickets(user, movieOrders) {
  // movieOrders: [{ movie, quantity }, ...]
  const booking = createBooking(user);
  for (const mo of movieOrders) {
    addMovieToBooking(booking, mo.movie, mo.quantity ?? 1);
  }
  return booking;
}

function calculateSubtotal(booking) {
  return booking.movies.reduce((sum, m) => sum + m.movie.ticketPrice * m.quantity, 0);
}

function getDiscountRate(userType) {
  // Standard -> 5%, VIP -> 12%
  const rates = { standard: 0.05, vip: 0.12 };
  return rates[userType] ?? 0;
}

function calculateTotal(booking) {
  const subtotal = calculateSubtotal(booking);
  const discountRate = getDiscountRate(booking.user.userType);
  const discount = roundToTwo(subtotal * discountRate);
  const total = roundToTwo(subtotal - discount);
  return { subtotal: roundToTwo(subtotal), discountRate, discount, total };
}

function roundToTwo(n) {
  return Math.round(n * 100) / 100;
}

function formatBill(booking) {
  const { subtotal, discountRate, discount, total } = calculateTotal(booking);
  const lines = [];
  lines.push(`Bill for: ${booking.user.name} (type: ${booking.user.userType.toUpperCase()})`);
  lines.push('---');
  for (const item of booking.movies) {
    const line = `${item.movie.name} x ${item.quantity} @ ${item.movie.ticketPrice.toFixed(2)} = ${(item.movie.ticketPrice * item.quantity).toFixed(2)}`;
    lines.push(line);
  }
  lines.push('---');
  lines.push(`Subtotal: $${subtotal.toFixed(2)}`);
  lines.push(`Discount (${(discountRate * 100).toFixed(0)}%): -$${discount.toFixed(2)}`);
  lines.push(`Total: $${total.toFixed(2)}`);
  return lines.join('\n');
}

// Exports for Node / testing — UMD-compatible
const MovieBooking = {
  createMovie,
  createUser,
  createBooking,
  addMovieToBooking,
  bookMultipleTickets,
  calculateSubtotal,
  calculateTotal,
  formatBill,
  getDiscountRate,
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = MovieBooking;
} else if (typeof window !== 'undefined') {
  // attach to window for browser usage
  window.MovieBooking = MovieBooking;
}


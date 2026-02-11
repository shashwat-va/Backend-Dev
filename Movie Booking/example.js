// example.js — demo for the Movie Ticket Booking System
const mb = require('./movieBooking');

// Create movies
const m1 = mb.createMovie('m1', 'Interstellar', 12.5);
const m2 = mb.createMovie('m2', 'Spirited Away', 9.0);
const m3 = mb.createMovie('m3', 'The Matrix', 11.0);

// Create users
const alice = mb.createUser('u1', 'Alice', 'standard');
const bob = mb.createUser('u2', 'Bob', 'vip');

// Bookings
const booking1 = mb.bookMultipleTickets(alice, [
  { movie: m1, quantity: 2 },
  { movie: m2, quantity: 1 },
]);

const booking2 = mb.bookMultipleTickets(bob, [
  { movie: m3, quantity: 3 },
]);

// Print bills
console.log(mb.formatBill(booking1));
console.log('\n');
console.log(mb.formatBill(booking2));

// app.js — UI glue for the Movie Ticket Booking demo (browser)
// Depends on window.MovieBooking (attached by movieBooking.js)

const moviesData = [
  MovieBooking.createMovie('m1', 'Interstellar', 12.5),
  MovieBooking.createMovie('m2', 'Spirited Away', 9.0),
  MovieBooking.createMovie('m3', 'The Matrix', 11.0),
];

function qs(sel) { return document.querySelector(sel); }

function renderMovies() {
  const container = qs('#movies-list');
  container.innerHTML = '';
  for (const m of moviesData) {
    const el = document.createElement('div');
    el.className = 'movie-item';
    el.innerHTML = `
      <div class="movie-meta">
        <div class="movie-name">${m.name}</div>
        <div class="movie-price">$${m.ticketPrice.toFixed(2)}</div>
      </div>
      <div class="movie-controls">
        <label>Qty <input type="number" min="0" value="0" data-id="${m.movieId}" class="qty-input" /></label>
      </div>
    `;
    container.appendChild(el);
  }
}

function getFormState() {
  const name = qs('#user-name').value.trim() || 'Guest';
  const userType = qs('#user-type').value;
  const user = MovieBooking.createUser('u-' + Date.now(), name, userType);

  const movieOrders = Array.from(document.querySelectorAll('.qty-input'))
    .map(input => ({ id: input.dataset.id, qty: Number(input.value) }))
    .filter(x => Number.isInteger(x.qty) && x.qty > 0)
    .map(x => ({ movie: moviesData.find(m => m.movieId === x.id), quantity: x.qty }));

  return { user, movieOrders };
}

function showBillText(text) {
  qs('#bill-output').textContent = text;
}

function onBook() {
  try {
    const { user, movieOrders } = getFormState();
    if (!movieOrders.length) return showBillText('Please select at least one ticket (quantity > 0).');
    const booking = MovieBooking.bookMultipleTickets(user, movieOrders);
    showBillText(MovieBooking.formatBill(booking));
  } catch (err) {
    showBillText('Error: ' + err.message);
  }
}

function onReset() {
  qs('#user-name').value = '';
  qs('#user-type').value = 'standard';
  document.querySelectorAll('.qty-input').forEach(i => i.value = 0);
  showBillText('(no booking yet)');
}

// init
renderMovies();
qs('#book-btn').addEventListener('click', onBook);
qs('#reset-btn').addEventListener('click', onReset);
qs('#user-name').addEventListener('keyup', e => { if (e.key === 'Enter') onBook(); });

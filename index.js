const API_URL = 'http://localhost:3000/produce';

const produceCards = document.getElementById('produceCards');
const locationFilter = document.getElementById('locationFilter');
const organicFilter = document.getElementById('organicFilter');
const produceForm = document.getElementById('produceForm');

let produceData = [];

// Fetch all produce from server
function fetchProduce() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      produceData = data;
      populateLocationFilter(data);
      renderProduceCards(data);
    })
    .catch(err => console.error('Error fetching produce:', err));
}

// Populate location filter dropdown dynamically
function populateLocationFilter(data) {
  const locations = [...new Set(data.map(item => item.location))];
  locationFilter.innerHTML = `<option value="all">All</option>`;
  locations.forEach(loc => {
    const option = document.createElement('option');
    option.value = loc;
    option.textContent = loc;
    locationFilter.appendChild(option);
  });
}

// Render produce cards
function renderProduceCards(data) {
  if (data.length === 0) {
    produceCards.innerHTML = '<p>No produce found matching your criteria.</p>';
    return;
  }

  produceCards.innerHTML = data.map(item => `
    <article class="produce-card" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" />
      <div class="produce-info">
        <h3>${item.name}</h3>
        <p><strong>Farmer:</strong> ${item.farmer}</p>
        <p><strong>Price:</strong> $${item.price.toFixed(2)} ${item.unit}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Pickup:</strong> ${item.pickupDate}</p>
        <p><strong>Delivery:</strong> ${item.deliveryDate}</p>
        <p><strong>Organic:</strong> ${item.organic ? 'Yes' : 'No'}</p>
        <div class="card-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.edit-btn').forEach(btn =>
    btn.addEventListener('click', handleEditClick)
  );

  document.querySelectorAll('.delete-btn').forEach(btn =>
    btn.addEventListener('click', handleDeleteClick)
  );
}

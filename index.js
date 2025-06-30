const API_URL = 'https://json-server-a3m4.onrender.com/produce';

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

// Filter logic
function filterProduce() {
  let filtered = [...produceData];

  const selectedLocation = locationFilter.value;
  const organicOnly = organicFilter.checked;

  if (selectedLocation !== 'all') {
    filtered = filtered.filter(item => item.location === selectedLocation);
  }

  if (organicOnly) {
    filtered = filtered.filter(item => item.organic);
  }

  renderProduceCards(filtered);
}

// Add or update produce
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(produceForm);
  const newProduce = {
    name: formData.get('name').trim(),
    farmer: formData.get('farmer').trim(),
    price: parseFloat(formData.get('price')),
    unit: formData.get('unit').trim(),
    location: formData.get('location').trim(),
    pickupDate: formData.get('pickupDate'),
    deliveryDate: formData.get('deliveryDate'),
    image: formData.get('image').trim(),
    organic: formData.get('organic') === 'on',
    available: true
  };

  const editId = produceForm.dataset.editId;

  if (editId) {
    // Update existing
    fetch(`${API_URL}/${editId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduce)
    })
      .then(res => res.json())
      .then(updated => {
        const index = produceData.findIndex(p => p.id == editId);
        produceData[index] = updated;
        produceForm.reset();
        delete produceForm.dataset.editId;
        produceForm.querySelector('button').textContent = 'Add Produce';
        filterProduce();
      })
      .catch(err => console.error('Error updating produce:', err));
  } else {
    // Create new
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduce)
    })
      .then(res => res.json())
      .then(added => {
        produceData.push(added);
        produceForm.reset();
        filterProduce();
      })
      .catch(err => console.error('Error adding produce:', err));
  }
}

// Handle edit click
function handleEditClick(event) {
  const card = event.target.closest('.produce-card');
  const id = card.dataset.id;
  const item = produceData.find(p => p.id == id);

  produceForm.name.value = item.name;
  produceForm.farmer.value = item.farmer;
  produceForm.price.value = item.price;
  produceForm.unit.value = item.unit;
  produceForm.location.value = item.location;
  produceForm.pickupDate.value = item.pickupDate;
  produceForm.deliveryDate.value = item.deliveryDate;
  produceForm.image.value = item.image;
  produceForm.organic.checked = item.organic;

  produceForm.dataset.editId = id;
  produceForm.querySelector('button').textContent = 'Update Produce';
}

// Handle delete click
function handleDeleteClick(event) {
  const card = event.target.closest('.produce-card');
  const id = card.dataset.id;

  if (confirm('Are you sure you want to delete this produce item?')) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        produceData = produceData.filter(p => p.id != id);
        filterProduce();
      })
      .catch(err => console.error('Error deleting produce:', err));
  }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  fetchProduce();
  locationFilter.addEventListener('change', filterProduce);
  organicFilter.addEventListener('change', filterProduce);
  produceForm.addEventListener('submit', handleFormSubmit);
});

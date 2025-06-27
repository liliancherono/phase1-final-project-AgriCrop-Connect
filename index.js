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
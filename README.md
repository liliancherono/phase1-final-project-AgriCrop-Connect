# phase1-final-project-AgriCrop-Connect
# AgriCrop Connect
AgriCrop Connect is a single-page web application that connects small and medium-scale farmers directly with local buyers, restaurants, and retailers. Farmers can list their produce, set pricing, and manage availability, while buyers can browse and filter listings by preferences such as organic certification and location.


## Live Demo
## View Live Site on GitHub Pages

# Table of Contents
Features

User Stories

Tech Stack

Getting Started

Screenshots

Project Structure

Stretch Goals

Contributing

License

Author

---

## Features
Add produce entries (name, price, image, location, organic status, pickup/delivery dates)

Filter produce by location and organic certification

Edit and delete produce listings

Fully responsive layout (desktop & mobile)

Asynchronous interactions with a local JSON API (json-server)

Clean, accessible, user-friendly UI
 
 ---

## User Stories
- As a farmer, I want to add new produce details so buyers can view and purchase my crops.

- As a farmer, I want to specify pickup and delivery dates to help coordinate logistics.

- As a farmer, I want to mark my produce as certified organic so that eco-conscious buyers can find them.

- As a buyer, I want to filter produce by type, location, and organic certification so I can find exactly what I need.

---

## Tech Stack
*HTML5*

*CSS3 (Flexbox & Grid)*

*JavaScript (Vanilla)*

*json-server for local REST API simulation*

---

## Getting Started
Prerequisites
Node.js installed globally

json-server installed:

bash
Copy
Edit
npm install -g json-server
Run Locally
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/agricrop-connect.git
cd agricrop-connect
Start the JSON server:

bash
Copy
Edit
json-server --watch db.json
Open index.html in your browser (or use Live Server in VSCode)

---

## Project Structure
pgsql
Copy
Edit
agricrop-connect/
├── index.html
├── styles.css
├── script.js
├── db.json
└── README.md

---

## Screenshots
Add screenshots here, for example:

Add Produce Form Interface

Filter & Listings View

Edit/Delete Produce Options

---

## Stretch Goals (Planned Features)
Buyer registration and authentication

Messaging system between buyers and farmers

Real-time availability updates

Backend deployment (e.g., Heroku, Render)

---

## Contributing
Contributions are welcome!
Please fork the repository, make your changes, and submit a pull request.

---

## License
MIT License.

---

## Author
Lilian Cherono

## Bee Food Delivery App
A modern web application for online food ordering with a simple and interactive user interface. Users can browse restaurants, add items to their cart and checkout.

## Features
Browse Restaurants: List of restaurants and their menus.

Add to Cart: Add items to the cart and update quantities.

Checkout Process: Users can enter delivery details and place orders.

Toast Notifications: Feedback notifications for order submission and success/failure.

Responsive Design: Optimized for both desktop and mobile use.

## Installation
Prerequisites
Node.js: Ensure you have Node.js installed. 

Steps
Clone the repository:

npm run dev
Open your browser and visit http://localhost:3000 to access the application.

## Technologies Used
React: JavaScript library for building user interfaces.

React Router: For navigation between pages.

Tailwind CSS: Utility-first CSS framework for styling.

React-Leaflet: For showing maps and tracking deliveries.

Sonner: For toast notifications.

Vite: A fast build tool for modern web projects.

JSON Server: Simulated backend with db.json to store orders.

API
Local API for Orders (db.json)
This app uses JSON Server to simulate an API for handling orders.

Base URL: http://localhost:4050

JSON Server Setup
Install JSON Server:
npm install -g json-server

Start the JSON server:
json-server --watch db.json --port 4050

## License
This project is licensed under the MIT License - see the LICENSE file for details.
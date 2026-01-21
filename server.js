/**
 * Main Server File - Entry Point of the Application
 * 
 * This file sets up the Express server with middleware configuration,
 * enables CORS for cross-origin requests, and loads all API routes.
 */

// Import Express framework - used to build web servers and APIs
const express = require("express");
// Create an Express application instance
const app = express();

// Import CORS middleware - allows requests from different domains
const cors = require("cors");

// Enable CORS middleware with specific configuration
// origin: Allow requests only from http://localhost:3001 (your frontend)
// credentials: true - Allow sending cookies and authentication headers
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

// Middleware to parse incoming JSON request bodies
// This converts JSON data in requests into JavaScript objects (req.body)
app.use(express.json());
// Middleware to parse URL-encoded request bodies (form data)
// extended: true allows complex objects and arrays to be encoded
app.use(express.urlencoded({ extended: true }));

// Import database configuration (connects to MySQL database)
const db = require("./app/config/db.config");

// Define root route - this is the welcome endpoint
// GET / - When someone visits http://localhost:3000/
// (req, res) - req contains request data, res is used to send response
app.get("/", (req, res) => {
    // Send a JSON response with a welcome message
    res.json({ message: "Welcome to NodeJS + Express + MySQL API." });
});

// Load all product-related routes (GET /products, POST /products, etc.)
// This function receives the app and registers routes to it
require("./app/routes/product.route.js")(app);
// Load all category-related routes (GET /categories, POST /categories, etc.)
require("./app/routes/category.route.js")(app);
require("./app/routes/user.route.js")(app);

// Set the port for the server to listen on
// If PORT environment variable is set, use it; otherwise use port 3000
const PORT = process.env.PORT || 3000;
// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    // Print message to console when server starts successfully
    console.log(`Server is running on http://localhost:${PORT}.`);
});

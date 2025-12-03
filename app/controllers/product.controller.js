/**
 * Product Controller
 * 
 * This file handles the business logic for product requests.
 * It receives HTTP requests, processes them using the Product model,
 * and sends back appropriate responses.
 */

// Import the Product model to access database operations
const Product = require("../models/product.model");

// GET endpoint handler - Retrieve all products
// This function handles GET /products requests
// req = request object (contains data from the client)
// res = response object (used to send data back to client)
exports.findAll = (req, res) => {
  // Call Product.getAll() to fetch all products from database
  // Callback receives (err, data) - either error or the results
  Product.getAll((err, data) => {
    // If an error occurred during database query
    if (err)
      // Send HTTP 500 (Internal Server Error) with error message
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    // If successful
    else
      // Send the products data back to the client
      res.send(data);
  });
};

// GET endpoint handler - Retrieve a single product by ID
// This function handles GET /products/:id requests
// :id is a URL parameter - the product ID to retrieve
exports.findOne = (req, res) => {
  // Call Product.findById() to fetch the specific product from database
  // req.params.id extracts the :id from the URL
  Product.findById(req.params.id, (err, data) => {
    // If error occurred
    if (err) {
      // Check if the error was "not found"
      if (err.kind === "not_found") {
        // Send HTTP 404 (Not Found) - product doesn't exist
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        // Send HTTP 500 (Internal Server Error) for other errors
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.id
        });
      }
    } else
      // If successful, send the product data
      res.send(data);
  });
};

// POST endpoint handler - Create a new product
// This function handles POST /products requests with product data in body
exports.create = (req, res) => {
  // Validation: Check if all required fields are provided
  // name, price, and cat_id are mandatory
  if (!req.body.name || !req.body.price || !req.body.cat_id) {
    // Send HTTP 400 (Bad Request) if any required field is missing
    res.status(400).send({
      message: "Product name, price, and category ID are required!"
    });
    return;  // Stop execution here
  }

  // Create a new Product object with the data from request body
  const product = new Product({
    name: req.body.name,                // Get product name from request
    price: req.body.price,              // Get price from request
    cat_id: req.body.cat_id,            // Get category ID from request
    image: req.body.image || null       // Get image (optional, defaults to null)
  });

  // Call Product.create() to insert this product into the database
  Product.create(product, (err, data) => {
    // If error occurred during insert
    if (err)
      // Send HTTP 500 (Internal Server Error) with error message
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    // If successful
    else
      // Send the newly created product data back to client
      res.send(data);
  });
};

// PUT endpoint handler - Update an existing product
// This function handles PUT /products/:id requests
// :id is a URL parameter - the product ID to update
exports.update = (req, res) => {
  // Validation: Check if all required fields are provided
  if (!req.body.name || !req.body.price || !req.body.cat_id) {
    // Send HTTP 400 (Bad Request) if any required field is missing
    res.status(400).send({
      message: "Product name, price, and category ID are required!"
    });
    return;
  }

  // Create a Product object with the updated data
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    cat_id: req.body.cat_id,
    image: req.body.image || null    // Use provided image or null if not provided
  });

  // Call Product.updateById() to update the product in database
  // req.params.id extracts the :id from the URL
  Product.updateById(req.params.id, product, (err, data) => {
    // If error occurred
    if (err) {
      // Check if the error was "not found"
      if (err.kind === "not_found") {
        // Send HTTP 404 (Not Found) - product doesn't exist
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        // Send HTTP 500 (Internal Server Error) for other errors
        res.status(500).send({
          message: "Error updating product with id " + req.params.id
        });
      }
    } else
      // If successful, send the updated product data
      res.send(data);
  });
};

// DELETE endpoint handler - Delete a product
// This function handles DELETE /products/:id requests
exports.delete = (req, res) => {
  // Call Product.remove() to delete the product from database
  // req.params.id extracts the :id from the URL
  Product.remove(req.params.id, (err, data) => {
    // If error occurred
    if (err) {
      // Check if the error was "not found"
      if (err.kind === "not_found") {
        // Send HTTP 404 (Not Found) - product doesn't exist
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        // Send HTTP 500 (Internal Server Error) for other errors
        res.status(500).send({
          message: "Could not delete product with id " + req.params.id
        });
      }
    } else
      // If successful, send success message
      res.send({ message: "Product was deleted successfully!" });
  });
};

// DELETE endpoint handler - Delete all products
// This function handles DELETE /products requests (no ID)
// WARNING: This will delete ALL products in the database!
exports.deleteAll = (req, res) => {
  // Call Product.removeAll() to delete all products from database
  Product.removeAll((err, data) => {
    // If error occurred
    if (err)
      // Send HTTP 500 (Internal Server Error) with error message
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    // If successful
    else
      // Send success message
      res.send({ message: "All products were deleted successfully!" });
  });
};

// Export all functions defined in this file (findAll, findOne, create, update, delete, deleteAll)
module.exports = exports;
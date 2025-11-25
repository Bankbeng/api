// This file is the CONTROLLER for products
// A controller handles HTTP requests from the client
// When someone makes a request (GET, POST, PUT, DELETE), the controller handles it

// Import the Product model
// This gives us access to all the database functions in the Product model
const Product = require("../models/product.model");

// CONTROLLER FUNCTION: findAll
// This handles GET requests to /products
// It gets ALL products from the database and sends them to the client
// "req" = the request object from the client
// "res" = the response object we use to send data back to the client
exports.findAll = (req, res) => {
  // Call the Product model's getAll function
  // We pass a callback function that will run when the database query finishes
  Product.getAll((err, data) => {
    // If there was an error
    if (err)
      // Send back an error response
      // res.status(500) means "500 Internal Server Error" (something went wrong on our server)
      // res.send() sends JSON data back to the client
      res.status(500).send({
        // The error message - either the real error message or a default one
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else
      // No error! Send the products data back to the client
      // The client will get the array of products as JSON
      res.send(data);
  });
};

// CONTROLLER FUNCTION: findOne
// This handles GET requests to /products/:id
// It gets ONE specific product by ID
// "req" has the request information, including the ID from the URL
// "res" is used to send the response back
exports.findOne = (req, res) => {
  // req.params.id gets the ID from the URL
  // For example, if the URL is /products/5, then req.params.id = 5
  // Call the Product model's findById function with that ID
  Product.findById(req.params.id, (err, data) => {
    // If there was an error
    if (err) {
      // err.kind === "not_found" means the product ID doesn't exist
      if (err.kind === "not_found") {
        // Send a 404 Not Found error
        // 404 means "the requested resource was not found"
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        // Some other error happened
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.id
        });
      }
    } else
      // Success! Send the product back to the client
      res.send(data);
  });
};

// CONTROLLER FUNCTION: create
// This handles POST requests to /products
// It creates a NEW product in the database
// The client sends the product data in the request body
exports.create = (req, res) => {
  // VALIDATION: Check if all required fields were provided
  // req.body contains the data sent by the client in the POST request
  // We check if name, price, and cat_id exist
  if (!req.body.name || !req.body.price || !req.body.cat_id) {
    // If any field is missing, send a 400 Bad Request error
    // 400 means "your request is malformed" (client's fault)
    res.status(400).send({
      message: "Product name, price, and category ID are required!"
    });
    return; // Stop here, don't continue creating the product
  }

  // Create a new Product object with the data from the request
  // new Product() calls the Product constructor function
  // We pass req.body which contains: { name: "...", price: ..., cat_id: ... }
  const product = new Product({
    name: req.body.name,        // Take the name from the request
    price: req.body.price,      // Take the price from the request
    cat_id: req.body.cat_id     // Take the category ID from the request
  });

  // Call the Product model's create function to save to the database
  // Pass the product object and a callback function
  Product.create(product, (err, data) => {
    // If there was an error
    if (err)
      // Send error response
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    else
      // Success! Send the created product back to the client
      // The client will see the new product with its new ID
      res.send(data);
  });
};

// CONTROLLER FUNCTION: update
// This handles PUT requests to /products/:id
// It UPDATES an existing product
// The client sends the new data in the request body
exports.update = (req, res) => {
  // VALIDATION: Check if the request body exists and has data
  if (!req.body.name || !req.body.price || !req.body.cat_id) {
    res.status(400).send({
      message: "Product name, price, and category ID are required!"
    });
    return;
  }

  // Create a new Product object with the updated data from the request
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    cat_id: req.body.cat_id
  });

  // Call the Product model's updateById function
  // req.params.id gets the ID from the URL (like /products/5)
  // Pass the ID, the updated product object, and a callback
  Product.updateById(req.params.id, product, (err, data) => {
    // If there was an error
    if (err) {
      // Check what kind of error it is
      if (err.kind === "not_found") {
        // The product ID doesn't exist
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        // Some other error
        res.status(500).send({
          message: "Error updating product with id " + req.params.id
        });
      }
    } else
      // Success! Send the updated product back to the client
      res.send(data);
  });
};

// CONTROLLER FUNCTION: delete
// This handles DELETE requests to /products/:id
// It DELETES one specific product from the database
exports.delete = (req, res) => {
  // Call the Product model's remove function with the ID from the URL
  Product.remove(req.params.id, (err, data) => {
    // If there was an error
    if (err) {
      if (err.kind === "not_found") {
        // The product doesn't exist
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        // Some other error
        res.status(500).send({
          message: "Could not delete product with id " + req.params.id
        });
      }
    } else
      // Success! Send confirmation message to the client
      res.send({ message: "Product was deleted successfully!" });
  });
};

// CONTROLLER FUNCTION: deleteAll
// This handles DELETE requests to /products (with no ID)
// It DELETES ALL products from the database
// WARNING: This is very dangerous and should rarely be used!
exports.deleteAll = (req, res) => {
  // Call the Product model's removeAll function
  Product.removeAll((err, data) => {
    // If there was an error
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    else
      // Success! Send confirmation to the client
      res.send({ message: "All products were deleted successfully!" });
  });
};

// EXPORT all these controller functions
// This makes them available to the routes file
// The routes file will import these and attach them to URL endpoints
module.exports = exports;

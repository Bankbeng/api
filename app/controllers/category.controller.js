/**
 * Category Controller
 * 
 * This file handles the business logic for category requests.
 * It receives HTTP requests, processes them using the Category model,
 * and sends back appropriate responses.
 */

// Import the Category model to access database operations
const Category = require("../models/category.model");

// GET endpoint handler - Retrieve all categories
// This function handles GET /categories requests
// req = request object (contains data from the client)
// res = response object (used to send data back to client)
exports.findAll = (req, res) => {
  // Call Category.getAll() to fetch all categories from database
  // Callback receives (err, data) - either error or the results
  Category.getAll((err, data) => {
    // If an error occurred during database query
    if (err)
      // Send HTTP 500 (Internal Server Error) with error message
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    // If successful
    else
      // Send the categories data back to the client
      res.send(data);
  });
};

// POST endpoint handler - Create a new category
// This function handles POST /categories requests with category data in body
exports.create = (req, res) => {
  // Validation: Check if category name was provided in the request
  if (!req.body.cat_name) {
    // Send HTTP 400 (Bad Request) if name is missing
    res.status(400).send({
      message: "Category name cannot be empty!"
    });
    return;  // Stop execution here
  }

  // Create a new Category object with the data from request body
  const category = new Category({
    cat_name: req.body.cat_name,      // Get name from request
    is_deleted: false                 // New categories are not deleted
  });

  // Call Category.create() to insert this category into the database
  Category.create(category, (err, data) => {
    // If error occurred during insert
    if (err)
      // Send HTTP 500 (Internal Server Error) with error message
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    // If successful
    else
      // Send the newly created category data back to client
      res.send(data);
  });
};

// PUT endpoint handler - Update an existing category
// This function handles PUT /categories/:id requests
// :id is a URL parameter - the category ID to update
exports.update = (req, res) => {
  // Validation: Check if category name was provided
  if (!req.body.cat_name) {
    // Send HTTP 400 (Bad Request) if name is missing
    res.status(400).send({
      message: "Category name cannot be empty!"
    });
    return;
  }

  // Create a Category object with the updated data
  const category = new Category({
    cat_name: req.body.cat_name,
    is_deleted: req.body.is_deleted || false  // Use provided value or default to false
  });

  // Call Category.updateById() to update the category in database
  // req.params.id extracts the :id from the URL
  Category.updateById(req.params.id, category, (err, data) => {
    // If error occurred
    if (err) {
      // Check if the error was "not found"
      if (err.kind === "not_found") {
        // Send HTTP 404 (Not Found) - category doesn't exist
        res.status(404).send({
          message: `Not found category with id ${req.params.id}.`
        });
      } else {
        // Send HTTP 500 (Internal Server Error) for other errors
        res.status(500).send({
          message: "Error updating category with id " + req.params.id
        });
      }
    } else
      // If successful, send the updated category data
      res.send(data);
  });
};

// DELETE endpoint handler - Delete (soft delete) a category
// This function handles DELETE /categories/:id requests
exports.delete = (req, res) => {
  // Call Category.remove() to delete the category from database
  // req.params.id extracts the :id from the URL
  Category.remove(req.params.id, (err, data) => {
    // If error occurred
    if (err) {
      // Check if the error was "not found"
      if (err.kind === "not_found") {
        // Send HTTP 404 (Not Found) - category doesn't exist
        res.status(404).send({
          message: `Not found category with id ${req.params.id}.`
        });
      } else {
        // Send HTTP 500 (Internal Server Error) for other errors
        res.status(500).send({
          message: "Could not delete category with id " + req.params.id
        });
      }
    } else
      // If successful, send success message
      res.send({ message: "Category was deleted successfully!" });
  });
};

// Export all functions defined in this file (findAll, create, update, delete)
module.exports = exports;
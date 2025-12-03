/**
 * Category Routes
 * 
 * This file defines all URL routes for category operations.
 * It maps HTTP methods and paths to their corresponding controller functions.
 */

module.exports = app => {
  // Import the category controller which contains the logic for each operation
  const categories = require("../controllers/category.controller");

  // GET /categories
  // Retrieves all categories
  // Calls categories.findAll when this route is accessed
  app.get("/categories", categories.findAll);

  // POST /categories
  // Creates a new category
  // Request body must contain: { cat_name: "..." }
  // Calls categories.create when this route is accessed
  app.post("/categories", categories.create);

  // PUT /categories/:id
  // Updates an existing category by ID
  // :id in the URL is the category ID to update
  // Request body must contain: { cat_name: "...", is_deleted: true/false }
  // Calls categories.update when this route is accessed
  app.put("/categories/:id", categories.update);

  // DELETE /categories/:id
  // Deletes a category by ID (soft delete - marks as deleted)
  // :id in the URL is the category ID to delete
  // Calls categories.delete when this route is accessed
  app.delete("/categories/:id", categories.delete);
};
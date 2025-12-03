/**
 * Product Routes
 * 
 * This file defines all URL routes for product operations.
 * It maps HTTP methods and paths to their corresponding controller functions.
 */

module.exports = app => {

  // Import the product controller which contains the logic for each operation
  const products = require("../controllers/product.controller");

  // GET /products
  // Retrieves all products
  // Calls products.findAll when this route is accessed
  app.get("/products", products.findAll);
  // POST /products
  // Creates a new product
  // Request body must contain: { name: "...", price: 0, cat_id: 0, image: "..." }
  // Calls products.create when this route is accessed
  app.post("/products", products.create);
  // GET /products/:id
  // Retrieves a single product by ID
  // :id in the URL is the product ID to retrieve
  // Calls products.findOne when this route is accessed
  app.get("/products/:id", products.findOne);
  // PUT /products/:id
  // Updates an existing product by ID
  // :id in the URL is the product ID to update
  // Request body must contain: { name: "...", price: 0, cat_id: 0, image: "..." }
  // Calls products.update when this route is accessed
  app.put("/products/:id", products.update);
  // DELETE /products/:id
  // Deletes a single product by ID (permanent delete)
  // :id in the URL is the product ID to delete
  // Calls products.delete when this route is accessed
  app.delete("/products/:id", products.delete);
  // DELETE /products
  // Deletes ALL products in the database (WARNING: Permanent!)
  // Use with caution - this will remove all product records
  // Calls products.deleteAll when this route is accessed
  app.delete("/products", products.deleteAll);
};

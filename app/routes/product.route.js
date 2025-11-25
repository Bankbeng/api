// This file is the ROUTER for products
// A router defines all the URLs (endpoints) for products
// It says: "When someone makes a GET request to /products, use this controller function"

// This is a module.exports function that takes "app" as a parameter
// The "app" is the Express application object from server.js
// We're adding routes to this app
module.exports = app => {
  // Import the product controller
  // This gives us access to all the controller functions
  // (findAll, findOne, create, update, delete, deleteAll)
  const products = require("../controllers/product.controller");

  // Define all the routes for products

  // ROUTE 1: GET /products
  // When someone makes a GET request to /products
  // The controller's findAll function will run
  // This returns ALL products from the database
  app.get("/products", products.findAll);

  // ROUTE 2: POST /products
  // When someone makes a POST request to /products with data
  // The controller's create function will run
  // This creates a NEW product in the database
  app.post("/products", products.create);

  // ROUTE 3: GET /products/:id
  // When someone makes a GET request to /products/ followed by a NUMBER
  // The : before "id" means "id is a variable"
  // For example: /products/5 will have id = 5
  // The controller's findOne function will run
  // This returns ONE specific product
  app.get("/products/:id", products.findOne);

  // ROUTE 4: PUT /products/:id
  // When someone makes a PUT request to /products/ followed by a NUMBER
  // The controller's update function will run
  // This UPDATES an existing product
  app.put("/products/:id", products.update);

  // ROUTE 5: DELETE /products/:id
  // When someone makes a DELETE request to /products/ followed by a NUMBER
  // The controller's delete function will run
  // This DELETES one specific product
  app.delete("/products/:id", products.delete);

  // ROUTE 6: DELETE /products
  // When someone makes a DELETE request to /products (with no ID)
  // The controller's deleteAll function will run
  // This DELETES ALL products (use with caution!)
  app.delete("/products", products.deleteAll);
};

/**
 * Product Model
 * 
 * This file defines the Product data model and contains methods to interact
 * with the products table in the database (CRUD operations: Create, Read, Update, Delete).
 */

// Import the database connection
const sql = require("./db");

// Product Constructor - creates a new Product object
// This function is called when we need to create a new product instance
// product = object containing product data
const Product = function (product) {
  this.name = product.name;        // Product name (e.g., "Laptop", "Book")
  this.price = product.price;      // Product price (e.g., 999.99)
  this.cat_id = product.cat_id;    // Category ID - foreign key linking to category
  this.image = product.image;      // Image URL or path for product image
};

// Retrieve all products
// This is the READ operation
// callback = function that receives (error, data) after query completes
Product.getAll = (callback) => {
  // SQL query: SELECT all columns and rows from products table
  sql.query(
    "SELECT * FROM products",
    callback  // Pass callback to execute when query finishes
  );
};

// Create a new product
// This is the CREATE operation
// newProduct = object with name, price, cat_id, and image properties
Product.create = (newProduct, callback) => {
  // SQL query: INSERT a new row into products table
  // VALUES (?, ?, ?, ?) - four placeholders for the four columns
  sql.query(
    "INSERT INTO products (name, price, cat_id, image) VALUES (?, ?, ?, ?)",
    [newProduct.name, newProduct.price, newProduct.cat_id, newProduct.image],  // Values in order
    callback  // Execute this function when insert is complete
  );
};

// Find a specific product by ID
// This is a READ operation for a single record
// id = the product ID to search for
Product.findById = (id, callback) => {
  // SQL query: Find product with matching id
  // ? is a placeholder that gets replaced with the id value
  sql.query(
    "SELECT * FROM products WHERE id = ?",
    id,       // Replace ? with this id value
    callback  // Execute when query completes
  );
};

// Update an existing product by ID
// This is the UPDATE operation
// id = the product ID to update
// product = object with new name, price, cat_id, and image values
Product.updateById = (id, product, callback) => {
  // SQL query: UPDATE product columns for the matching id
  // ? placeholders get replaced with values in order
  sql.query(
    "UPDATE products SET name = ?, price = ?, cat_id = ?, image = ? WHERE id = ?",
    [product.name, product.price, product.cat_id, product.image, id],  // Values to substitute in order
    (err, res) => {
      // Handle error if query fails
      if (err) {
        callback(err, null);  // Pass error to callback
        return;               // Stop execution
      }
      // Check if any rows were actually updated
      if (res.affectedRows == 0) {
        // No rows matched the ID, so product not found
        callback({ kind: "not_found" }, null);
        return;
      }
      // Success! Return the updated product data
      callback(null, { id: id, ...product });  // Spread operator (...) merges objects
    }
  );
};

// Delete a product by ID (hard delete)
// This is the DELETE operation
// Note: This does a "hard delete" - it completely removes the row from database
// id = the product ID to delete
Product.remove = (id, callback) => {
  // SQL query: DELETE the entire product row with matching id
  // This is permanent - the data cannot be recovered
  sql.query(
    "DELETE FROM products WHERE id = ?",
    id,  // Replace ? with the product id
    (err, res) => {
      // Handle error if query fails
      if (err) {
        callback(err, null);
        return;
      }
      // Check if the product was found and deleted
      if (res.affectedRows == 0) {
        // No rows matched, product doesn't exist
        callback({ kind: "not_found" }, null);
        return;
      }
      // Success! Return the database response
      callback(null, res);
    }
  );
};

// Delete all products
// This is a DELETE operation that removes all rows from the table
// WARNING: This deletes everything - use with caution!
Product.removeAll = (callback) => {
  // SQL query: DELETE all rows from products table
  // This is very destructive - all products will be permanently removed
  sql.query(
    "DELETE FROM products",
    callback  // Execute this function when deletion is complete
  );
};

// Export the Product model so it can be used in other files (controllers)
module.exports = Product;
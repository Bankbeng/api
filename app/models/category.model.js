/**
 * Category Model
 * 
 * This file defines the Category data model and contains methods to interact
 * with the category table in the database (CRUD operations: Create, Read, Update, Delete).
 */

// Import the database connection
const sql = require("./db");

// Category Constructor - creates a new Category object
// This function is called when we need to create a new category instance
// category = object containing category data (cat_name, is_deleted)
const Category = function (category) {
  this.cat_name = category.cat_name;        // Category name (e.g., "Electronics", "Books")
  this.is_deleted = category.is_deleted;    // Boolean flag: true if deleted, false if active
};

// Retrieve all categories (that are not deleted)
// This is the READ operation
// callback = function that receives (error, data) after query completes
Category.getAll = (callback) => {
  // SQL query: SELECT all rows from category table where is_deleted is false
  sql.query(
    "SELECT * FROM category WHERE is_deleted = false",
    callback  // Pass callback to execute when query finishes
  );
};

// Create a new category
// This is the CREATE operation
// newCategory = object with cat_name and is_deleted properties
Category.create = (newCategory, callback) => {
  // SQL query: INSERT a new row into category table
  // SET ? means insert the properties from newCategory object
  sql.query(
    "INSERT INTO category SET ?",
    newCategory,  // The data to insert
    callback      // Execute this function when insert is complete
  );
};

// Find a specific category by ID
// This is a READ operation for a single record
// id = the category ID to search for
Category.findById = (id, callback) => {
  // SQL query: Find category with matching cat_id that is not deleted
  // ? is a placeholder that gets replaced with the id value (prevents SQL injection)
  sql.query(
    "SELECT * FROM category WHERE cat_id = ? AND is_deleted = false",
    id,       // Replace ? with this id value
    callback  // Execute when query completes
  );
};

// Update an existing category by ID
// This is the UPDATE operation
// id = the category ID to update
// category = object with new cat_name and is_deleted values
Category.updateById = (id, category, callback) => {
  // SQL query: UPDATE category columns for the matching cat_id
  // ? placeholders get replaced with values in order: cat_name, is_deleted, id
  sql.query(
    "UPDATE category SET cat_name = ?, is_deleted = ? WHERE cat_id = ?",
    [category.cat_name, category.is_deleted, id],  // Values to substitute in order
    (err, res) => {
      // Handle error if query fails
      if (err) {
        callback(err, null);  // Pass error to callback
        return;               // Stop execution
      }
      // Check if any rows were actually updated
      if (res.affectedRows == 0) {
        // No rows matched the ID, so category not found
        callback({ kind: "not_found" }, null);
        return;
      }
      // Success! Return the updated category data
      callback(null, { id: id, ...category });  // Spread operator (...) merges objects
    }
  );
};

// Delete (soft delete) a category by ID
// This is the DELETE operation
// Note: This does a "soft delete" - it marks as deleted instead of removing the row
// id = the category ID to delete
Category.remove = (id, callback) => {
  // SQL query: UPDATE the category to mark it as deleted (is_deleted = true)
  // Soft delete keeps the data but hides it
  sql.query(
    "UPDATE category SET is_deleted = true WHERE cat_id = ?",
    id,  // Replace ? with the category id
    (err, res) => {
      // Handle error if query fails
      if (err) {
        callback(err, null);
        return;
      }
      // Check if the category was found and deleted
      if (res.affectedRows == 0) {
        // No rows matched, category doesn't exist
        callback({ kind: "not_found" }, null);
        return;
      }
      // Success! Return the database response
      callback(null, res);
    }
  );
};

// Export the Category model so it can be used in other files (controllers)
module.exports = Category;
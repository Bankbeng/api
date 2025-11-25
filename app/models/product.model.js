// This file is the MODEL for products
// A model is where we write code to talk to the database
// All the database queries for products go in this file

// Import the database connection that we created in db.js
// Now we can use "sql" to run queries on the database
const sql = require("./db");

// This is a CONSTRUCTOR FUNCTION
// A constructor is a special function that creates new objects
// Every time we want to create a Product, we use this function
// The word "function" creates a function, and "Product" is its name
// The "(product)" means it takes one parameter: a product object
const Product = function (product) {
  // "this" means "this specific Product object we're creating"
  // We're taking the data passed in and storing it on this object
  // this.name = product.name means: take the name from the input and save it

  // Store the product's name (like "Laptop", "Mouse", etc.)
  this.name = product.name;

  // Store the product's price (like 999.99)
  this.price = product.price;

  // Store the category ID (a number that links this product to a category)
  // For example, cat_id = 1 might mean "Electronics"
  this.cat_id = product.cat_id;
};

// STATIC METHOD: getAll
// "Static" means this function belongs to the Product class itself, not to a single product
// "getAll" means we want to get ALL products from the database
// "callback" is a function that will be called when the query finishes
// We use callbacks to handle the result (or error) of the database query
Product.getAll = (callback) => {
  // sql.query runs a SQL query on the database
  // "SELECT * FROM products" means: get ALL columns (*) from ALL rows in the products table
  // callback is called when the query finishes, with (error, data) as parameters
  sql.query(
    "SELECT * FROM products",
    callback
  );
};

// STATIC METHOD: create
// This creates a NEW product in the database
// "newProduct" is the product object we want to save
// "callback" is a function that runs when the insert is finished
Product.create = (newProduct, callback) => {
  // INSERT INTO products (name, price, cat_id) VALUES (?, ?, ?)
  // This means: add a NEW row to the products table with the values
  // The ? symbols are placeholders - they'll be replaced with actual values
  // Using ? prevents SQL injection attacks (a security threat)
  // The [newProduct.name, newProduct.price, newProduct.cat_id] array provides the values
  sql.query(
    "INSERT INTO products (name, price, cat_id) VALUES (?, ?, ?)",
    [newProduct.name, newProduct.price, newProduct.cat_id],
    callback
  );
};

// STATIC METHOD: findById
// This gets ONE specific product by its ID
// "id" is the product ID we're looking for (like: find product #5)
// "callback" is a function that runs when the query finishes
Product.findById = (id, callback) => {
  // SELECT * FROM products WHERE id = ?
  // This means: get all columns from the products table WHERE the id column equals our id
  // WHERE is how we filter/search in SQL
  sql.query(
    "SELECT * FROM products WHERE id = ?",
    id,
    callback
  );
};

// STATIC METHOD: updateById
// This UPDATES an existing product's information
// "id" is which product to update (like: update product #5)
// "product" is the new data (the updated name, price, cat_id)
// "callback" is a function that runs when the update is finished
Product.updateById = (id, product, callback) => {
  // UPDATE products SET name = ?, price = ?, cat_id = ? WHERE id = ?
  // This means: UPDATE the products table, SET these columns to new values, WHERE id matches
  // We provide the new values in an array: [new_name, new_price, new_cat_id, id]
  sql.query(
    "UPDATE products SET name = ?, price = ?, cat_id = ? WHERE id = ?",
    [product.name, product.price, product.cat_id, id],
    // This is a CALLBACK FUNCTION with two parameters:
    // err - will contain an error if something went wrong
    // res - will contain the result of the query
    (err, res) => {
      // If err is not null/undefined, something went wrong
      if (err) {
        // Send the error back to the callback
        callback(err, null);
        return; // Stop here, don't continue
      }

      // res.affectedRows tells us how many rows were changed
      // If affectedRows is 0, it means no rows matched our WHERE condition
      // (probably because the product ID doesn't exist)
      if (res.affectedRows == 0) {
        // Send a special error object back to callback
        // The callback will check if err.kind === "not_found"
        callback({ kind: "not_found" }, null);
        return;
      }

      // If we get here, the update was successful!
      // Send the updated product back to the callback
      // { id: id, ...product } means: create an object with id and all the product properties
      // The "..." (spread operator) copies all properties from product into the new object
      callback(null, { id: id, ...product });
    }
  );
};

// STATIC METHOD: remove
// This DELETES a product from the database
// "id" is which product to delete (like: delete product #5)
// "callback" is a function that runs when the delete is finished
Product.remove = (id, callback) => {
  // DELETE FROM products WHERE id = ?
  // This means: permanently DELETE the row from products table where id matches
  // WARNING: This is permanent! You can't undo a DELETE!
  sql.query(
    "DELETE FROM products WHERE id = ?",
    id,
    // Anonymous callback function to handle the result
    (err, res) => {
      if (err) {
        callback(err, null);
        return;
      }

      // If no rows were deleted, the product ID doesn't exist
      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }

      // Success! The product was deleted
      callback(null, res);
    }
  );
};

// STATIC METHOD: removeAll
// This DELETES ALL products from the database
// WARNING: This is very dangerous! It removes everything!
// We usually only use this for testing
Product.removeAll = (callback) => {
  // DELETE FROM products
  // This means: delete ALL rows from the products table
  // No WHERE condition, so it deletes everything!
  sql.query(
    "DELETE FROM products",
    callback
  );
};

// EXPORT the Product model
// This makes the Product available to other files
// When other files do: const Product = require("../models/product.model");
// They get this Product model
module.exports = Product;

/**
 * Database Connection File
 * 
 * This file establishes the actual connection to MySQL database.
 * It creates a connection object that other files will use to execute SQL queries.
 */

// Import MySQL library for Node.js
const mysql = require("mysql");
// Import database credentials from config file
const dbConfig = require("../config/db.config");

// Create a MySQL connection using the credentials from config
// This stores the connection but doesn't connect yet
const connection = mysql.createConnection({
  host: dbConfig.HOST,          // Server location
  user: dbConfig.USER,          // Database username
  password: dbConfig.PASSWORD,  // Database password
  database: dbConfig.DB         // Database name to use
});

// Attempt to connect to the database
// The callback function handles connection success or failure
connection.connect(error => {
  // If there's an error during connection
  if (error) {
    // Throw an error to stop the application and show the problem
    throw error;
  }
  // If connection successful, print confirmation message
  console.log("Successfully connected to the database.");
});

// Export the connection so other files can use it to run queries
module.exports = connection;

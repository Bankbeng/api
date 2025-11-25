// This file creates the CONNECTION to the MySQL database
// A connection is like a phone line between your app and the database
// Without this, your app can't talk to MySQL

// First, we import the "mysql" package that we installed
// This package has tools for connecting to MySQL
const mysql = require("mysql");

// Next, we import the database settings from the config file
// This gives us the HOST, USER, PASSWORD, and DB name
const dbConfig = require("../config/db.config");

// Now we CREATE a connection using the mysql package
// Think of this like dialing a phone number to connect to MySQL
// We're passing all the settings from dbConfig (host, user, password, database)
const connection = mysql.createConnection({
  // The server address - where MySQL is running
  host: dbConfig.HOST,

  // The username to login with
  user: dbConfig.USER,

  // The password to login with
  password: dbConfig.PASSWORD,

  // The database name to use
  database: dbConfig.DB
});

// Now we actually TRY to connect
// This is like trying to make the phone call
// If it succeeds, we print a success message
// If it fails, we print an error message and stop
connection.connect(error => {
  // If there was an error (the "error" parameter will have the error details)
  if (error) {
    // "throw error" means: stop everything and show the error
    // This is useful because we can't do anything without a database connection
    throw error;
  }
  // If we get here, there was NO error, so we print success message
  console.log("Successfully connected to the database.");
});

// Finally, we EXPORT this connection
// "export" means we're making this connection available to other files
// Other files will do: const sql = require("./db");
// And then they can use "sql" to query the database
module.exports = connection;

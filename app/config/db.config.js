// This file stores all the database connection settings
// Think of it like a "recipe card" that tells your app how to connect to MySQL
// We keep these settings separate so they're easy to find and change later

module.exports = {
  // HOST: This is the address where MySQL server is running
  // "localhost" means it's on YOUR computer
  // If MySQL was on another computer, you'd put that computer's address here
  HOST: "localhost",

  // USER: This is the username to login to MySQL
  // By default, MySQL creates a user called "root" (the admin user)
  USER: "root",

  // PASSWORD: This is the password for the MySQL user
  // It's empty ("") because we haven't set a password for local development
  // In a real app, this would be a secret password
  PASSWORD: "1234",

  // DB: This is the name of the database we want to use
  // A database can have many tables, but we tell MySQL which database to use here
  // Our database is called "crud_db"
  DB: "testdb"
};

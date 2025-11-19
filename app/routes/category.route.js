// category.route.js

module.exports = app => {
    const categories = require("../controllers/category.controller");

    // Retrieve all Categories (GET)
    app.get("/categories", categories.findAll);

    // Create a new Category (POST)
    app.post("/categories", categories.create);

    // Update a Category with categoryId (PUT)
    app.put("/categories/:id", categories.update);

    // Delete a Category with categoryId (DELETE)
    app.delete("/categories/:id", categories.delete);
};
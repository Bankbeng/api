// category.controller.js

const Category = require("../models/category.model"); 

// --- C: Create (POST) ---
exports.create = (req, res) => {
    // Validate request body
    if (!req.body.cat_name) {
        res.status(400).send({ message: "Category name cannot be empty!" });
        return;
    }

    const newCategory = new Category({
        cat_name: req.body.cat_name,
    });

    Category.create(newCategory, (error, data) => {
        if (error) {
            res.status(500).send({ message: error.message || "Some error occurred while creating the category." });
        } else {
            res.status(201).send(data); // 201 Created
        }
    });
};

// --- R: Read All (GET) ---
exports.findAll = (req, res) => {
    Category.getAll((error, data) => {
        if (error) {
            res.status(500).send({ message: error.message || "Some error occurred while retrieving categories." });
        } else {
            res.send(data);
        }
    });
};

// --- U: Update by ID (PUT) ---
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Data to update cannot be empty!" });
        return;
    }

    Category.updateById(req.params.id, new Category(req.body), (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({ message: `Category with id ${req.params.id} not found.` });
            } else {
                res.status(500).send({ message: `Error updating category with id ${req.params.id}` });
            }
        } else {
            res.send(data);
        }
    });
};

// --- D: Delete by ID (DELETE) ---
exports.delete = (req, res) => {
    Category.remove(req.params.id, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({ message: `Category with id ${req.params.id} not found.` });
            } else {
                res.status(500).send({ message: `Could not delete category with id ${req.params.id}` });
            }
        } else {
            res.send({ message: "Category was deleted successfully!" });
        }
    });
};
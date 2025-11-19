const Product = require("../models/product.model.js");

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

// Create a new product
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        cat_id: req.body.cat_id
    });

    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
        else res.send(data);
    });
};

// Update a product
exports.update = (req, res) => {
    if (!req.body.name && !req.body.price && !req.body.cat_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        cat_id: req.body.cat_id
    });

    Product.updateById(req.params.id, product, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating product with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Delete a product
exports.delete = (req, res) => {
    Product.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete product with id " + req.params.id
                });
            }
        } else res.send({ message: "Product was deleted successfully!" });
    });
};

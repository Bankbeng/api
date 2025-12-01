const Product = require("../models/product.model");

exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else
      res.send(data);
  });
};

exports.findOne = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.id
        });
      }
    } else
      res.send(data);
  });
};

exports.create = (req, res) => {
  // UPDATE VALIDATION - image is optional
  if (!req.body.name || !req.body.price || !req.body.cat_id) {
    res.status(400).send({
      message: "Product name, price, and category ID are required!"
    });
    return;
  }

  // CREATE PRODUCT - include image (can be null/empty)
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    cat_id: req.body.cat_id,
    image: req.body.image || null  // ADD THIS - default to null if not provided
  });

  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    else
      res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.cat_id) {
    res.status(400).send({
      message: "Product name, price, and category ID are required!"
    });
    return;
  }

  // UPDATE PRODUCT - include image
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    cat_id: req.body.cat_id,
    image: req.body.image || null  // ADD THIS
  });

  Product.updateById(req.params.id, product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating product with id " + req.params.id
        });
      }
    } else
      res.send(data);
  });
};

exports.delete = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.id
        });
      }
    } else
      res.send({ message: "Product was deleted successfully!" });
  });
};

exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    else
      res.send({ message: "All products were deleted successfully!" });
  });
};

module.exports = exports;
module.exports = app => {
    const products = require("../controllers/product.controller.js");

    app.get("/products", products.findAll);
};

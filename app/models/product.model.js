const sql = require("./db.js");

const Product = function(product) {
    this.name = product.name;
    this.price = product.price;
    this.cat_id = product.cat_id;
};

// Get all products
Product.getAll = (callback) => {
    sql.query("SELECT * FROM products", callback);
};

// Create a new product
Product.create = (newProduct, callback) => {
    sql.query("INSERT INTO products SET ?", newProduct, callback);
};

// Update a product by id
Product.updateById = (id, product, callback) => {
    sql.query("UPDATE products SET name = ?, price = ?, cat_id = ? WHERE id = ?", 
              [product.name, product.price, product.cat_id, id], 
              (err, res) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            callback({ kind: "not_found" }, null);
            return;
        }
        callback(null, { id: id, ...product });
    });
};

// Delete a product by id
Product.remove = (id, callback) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            callback({ kind: "not_found" }, null);
            return;
        }
        callback(null, res);
    });
};

module.exports = Product;

const sql = require("./db");

const Product = function (product) {
  this.name = product.name;
  this.price = product.price;
  this.cat_id = product.cat_id;
  this.image = product.image;
};

Product.getAll = (callback) => {
  sql.query(
    "SELECT * FROM products",
    callback
  );
};

Product.create = (newProduct, callback) => {
  sql.query(
    "INSERT INTO products (name, price, cat_id, image) VALUES (?, ?, ?, ?)",
    [newProduct.name, newProduct.price, newProduct.cat_id, newProduct.image],
    callback
  );
};

Product.findById = (id, callback) => {
  sql.query(
    "SELECT * FROM products WHERE id = ?",
    id,
    callback
  );
};

Product.updateById = (id, product, callback) => {
  sql.query(
    "UPDATE products SET name = ?, price = ?, cat_id = ?, image = ? WHERE id = ?",
    [product.name, product.price, product.cat_id, product.image, id],
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
    }
  );
};

Product.remove = (id, callback) => {
  sql.query(
    "DELETE FROM products WHERE id = ?",
    id,
    (err, res) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }
      callback(null, res);
    }
  );
};

Product.removeAll = (callback) => {
  sql.query(
    "DELETE FROM products",
    callback
  );
};

module.exports = Product;
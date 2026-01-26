const sql = require("./db");

const Category = function (category) {
  this.cat_name = category.cat_name;
  this.is_deleted = category.is_deleted;
};

Category.getAll = (callback) => {
  sql.query(
    "SELECT * FROM category WHERE is_deleted = false",
    callback
  );
};

Category.create = (newCategory, callback) => {
  sql.query(
    "INSERT INTO category SET ?",
    newCategory,
    callback
  );
};

Category.findById = (id, callback) => {
  sql.query(
    "SELECT * FROM category WHERE cat_id = ? AND is_deleted = false",
    id,
    callback
  );
};

Category.updateById = (id, category, callback) => {
  sql.query(
    "UPDATE category SET cat_name = ?, is_deleted = ? WHERE cat_id = ?",
    [category.cat_name, category.is_deleted, id],
    (err, res) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }
      callback(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, callback) => {
  sql.query(
    "UPDATE category SET is_deleted = true WHERE cat_id = ?",
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

module.exports = Category;
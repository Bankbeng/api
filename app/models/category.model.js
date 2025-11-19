// category.model.js

const sql = require("./db"); // Assuming your database connection is here

// Constructor (maps JavaScript object to table columns)
const Category = function (category) {
    this.cat_name = category.cat_name;
};

// --- C: Create (POST) ---
Category.create = (newCategory, result) => {
    sql.query("INSERT INTO category SET ?", newCategory, (error, response) => {
        if (error) {
            console.error("Error creating category:", error);
            result(error, null);
            return;
        }
        result(null, { id: response.insertId, ...newCategory });
    });
};

// --- R: Read All (GET) ---
Category.getAll = (result) => {
    // Select all non-deleted categories
    sql.query("SELECT * FROM category WHERE is_deleted = 0", (error, res) => {
        if (error) {
            console.error("Error retrieving categories:", error);
            result(error, null);
            return;
        }
        result(null, res);
    });
};

// --- U: Update by ID (PUT) ---
Category.updateById = (id, updatedCategory, result) => {
    // Update only the mutable column, cat_name
    sql.query(
        "UPDATE category SET cat_name = ? WHERE id = ?",
        [updatedCategory.cat_name, id],
        (error, response) => {
            if (error) {
                console.error("Error updating category:", error);
                result(error, null);
                return;
            }

            if (response.affectedRows == 0) {
                result({ kind: "not_found" }, null); // Category not found
                return;
            }

            result(null, { id: id, ...updatedCategory });
        }
    );
};

// --- D: Delete by ID (DELETE - Soft Delete) ---
Category.remove = (id, result) => {
    // Perform a soft delete by setting is_deleted to 1
    sql.query("UPDATE category SET is_deleted = 1 WHERE id = ?", id, (error, response) => {
        if (error) {
            console.error("Error soft-deleting category:", error);
            result(error, null);
            return;
        }

        if (response.affectedRows == 0) {
            result({ kind: "not_found" }, null); // Category not found
            return;
        }

        result(null, { message: "Category was soft-deleted successfully!" });
    });
};

module.exports = Category;
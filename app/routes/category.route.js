module.exports = app => {
  const categories = require("../controllers/category.controller");

  app.get("/categories", categories.findAll);

  app.post("/categories", categories.create);

  app.put("/categories/:id", categories.update);

  app.delete("/categories/:id", categories.delete);
};
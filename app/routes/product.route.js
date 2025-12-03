module.exports = app => {

  const products = require("../controllers/product.controller");

  app.get("/products", products.findAll);
  app.post("/products", products.create);
  app.get("/products/:id", products.findOne);
  app.put("/products/:id", products.update);
  app.delete("/products/:id", products.delete);
  app.delete("/products", products.deleteAll);
};

const auth = require('./authen.route');
module.exports = app => {

  const products = require("../controllers/product.controller");

  //app.get("/products", auth, products.findAll);
  app.get("/products", products.findAll);
  //app.post("/products", auth, products.create);
  app.post("/products", products.create);
  app.get("/products/:id", auth, products.findOne);
  app.put("/products/:id", auth, products.update);
  app.delete("/products/:id", auth, products.delete);
  app.delete("/products", auth, products.deleteAll);
};

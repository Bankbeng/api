const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/config/db.config");

app.get("/", (req, res) => {
    res.json({ message: "Welcome to NodeJS + Express + MySQL API." });
});

require("./app/routes/product.route.js")(app);
require("./app/routes/category.route")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});

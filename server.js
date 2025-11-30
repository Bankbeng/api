const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3001", // Your Next.js URL
  credentials: true
}));

// ADD THESE TWO LINES - This tells Express to parse JSON from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Then add your routes AFTER this
const db = require("./app/config/db.config");

app.get("/", (req, res) => {
    res.json({ message: "Welcome to NodeJS + Express + MySQL API." });
});

require("./app/routes/product.route.js")(app);
require("./app/routes/category.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});

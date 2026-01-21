const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send({ message: "Access token is missing." });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userID = decoded.userID;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid access token." });
    }
};
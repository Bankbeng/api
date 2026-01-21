const e = require("cors");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Email and password are required."
        });
        return;
    }
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    User.create(newUser, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error"
            });
        }
        else {
                res.status(201).send(data);
        }
    });
};

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Email and password are required."
        });
        return;
    }
    User.loginByEmailAndPassword(req.body.email, req.body.password, (err, user) => {
        if (hasError(err, res)) return;
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(accessToken, user.id);
        res.json({ accessToken, refreshToken});
    });
};

generateAccessToken = (userID) => {
    return jwt.sign({ userID: userID }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

generateRefreshToken = (accessToken, userID) => {
    return jwt.sign({userID: userID, accessToken: accessToken}, process.env.REFRESH_KEY, { expiresIn: '7d' });
};

hasError = (err, res) => {
    if (err) {
        if (err.kind === "not_found") {
            res.status(401).send({ message: "Invalid email or password." });
        }
        else {
            res.status(500).send({ message: err.message || "Some error occurred." });
        }
        return true;
    }
    return false;
};
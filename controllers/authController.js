const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { secretKey, options } = require("../config/jwtConfig");
const { response } = require("express");

exports.register = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body, "hhhhhhhhhhhh");
    try {
        const user = new User({ username: username, password: password });
        await user.save();
        res.status(200).json({ message: "User Resgister successfully" });
    } catch (error) {
        res.status(500).json({ message: "Registration Error", error });
    }
};
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });


        if (!user) {
            return res.status(401).json({ message: "Invalid username" });
        }

        // Call comparePasswords method to verify password
        const isPasswordValid = await user.comparePasswords(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.protectedRoute = (req, res) => {
    res.json({ message: "protected route", user: req.user });
}
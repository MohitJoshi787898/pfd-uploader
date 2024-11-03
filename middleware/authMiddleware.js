// This middleware will protect routes by verifying the JWT token.

const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwtConfig');
exports.verifyToken = (req, res) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
}
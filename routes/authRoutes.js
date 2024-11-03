const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


// creating routes for application 
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authMiddleware.verifyToken, authController.protectedRoute)

module.exports = router;
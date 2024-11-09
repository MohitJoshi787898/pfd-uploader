const express = require('express');
const router = express.Router();
const windowIosController = require('../controllers/WindowIosController');


router.get("/", windowIosController.getAllWindowIos)

router.post("/", windowIosController.createWindowIos)

module.exports = router
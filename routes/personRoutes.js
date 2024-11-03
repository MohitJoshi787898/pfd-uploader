const express = require('express');
const router = express.Router();
console.log("preson")

const personController = require("../controllers/personController")

// creating routes for application
router.post("/createPerson", personController.creatPerson)
router.get("/", personController.getAllPerson)
module.exports = router;
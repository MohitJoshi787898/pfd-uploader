const express = require('express');
const router = express.Router();
const contactUsController = require("../controllers/contactUsController")
//POST route to create a new contact
router.post("/contact", contactUsController.createContactUsRequest);
module.exports = router;
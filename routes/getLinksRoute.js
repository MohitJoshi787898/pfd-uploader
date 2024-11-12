const express = require('express');
const router = express.Router();
const getLinksController = require("../controllers/getLinks");
// GET route to retrieve all links
router.get('/', getLinksController.getLinks);
module.exports = router;
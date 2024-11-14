const express = require('express');
const route = express.Router();
const getAllApiController = require("../controllers/getAllData");

// GET route to retrieve all data

route.get('/', getAllApiController.getAllApi);

module.exports = route;
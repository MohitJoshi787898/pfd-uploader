const express = require('express');
const router = express.Router();
const cancellationController = require('../controllers/cancellationController');

// POST route to create a cancellation request
router.post('/cancellation', cancellationController.createCancellation);

// GET route to retrieve all cancellation requests
router.get('/cancellations', cancellationController.getCancellations);

module.exports = router;

const Cancellation = require('../models/cancellationModel');

// POST API: Create a new cancellation request
exports.createCancellation = async (req, res) => {
    try {
        const newCancellation = new Cancellation(req.body);
        const savedCancellation = await newCancellation.save();

        res.status(201).json({
            success: true,
            message: 'Cancellation request created successfully',
            data: savedCancellation,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating cancellation request',
            error: error.message,
        });
    }
};

// GET API: Retrieve all cancellation requests
exports.getCancellations = async (req, res) => {
    try {
        const cancellations = await Cancellation.find();
        res.status(200).json({
            success: true,
            data: cancellations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving cancellation requests',
            error: error.message,
        });
    }
};

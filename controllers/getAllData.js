const cancellationModal = require("../models/cancellationModel")
const contactUsModal = require("../models/contactUsModal")
const userModal = require("../models/userModel")
const ticketModal = require("../models/ticketModel")
const windowIosModal = require("../models/windowIosModal")

exports.getAllApi = async (req, res) => {
    try {
        const cancellations = await cancellationModal.find();
        const contactUs = await contactUsModal.find();
        const user = await userModal.find();
        const ticket = await ticketModal.find();
        const windowIos = await windowIosModal.find();
        res.status(200).json({
            success: true,
            cancellations: cancellations,
            contactUs: contactUs,
            user: user,
            ticket: ticket,
            windowIos: windowIos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving cancellation requests',
            error: error.message,
        });
    }
};
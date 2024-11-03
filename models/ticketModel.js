const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    ticketNumber: {
        type: String,
        required: true,
        unique: true
    },
    details: {
        type: String,


    },
    status: {
        type: String,
        enum: ["open", "closed", "in-progress"],
        default: "open"
    }
})

module.exports = mongoose.model("Ticket", ticketSchema);
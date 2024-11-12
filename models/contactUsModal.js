const mongoose = require('mongoose');
const contactUsSchema = new mongoose.Schema({
    affectedIncident: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });
module.exports = mongoose.model("contactUs", contactUsSchema);
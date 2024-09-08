const mongoose = require('mongoose');

// Define the schema for PDFs
const PdfSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: true
    },
    pdfLink: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pdf', PdfSchema);

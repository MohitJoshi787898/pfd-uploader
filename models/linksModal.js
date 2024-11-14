const mongoose = require('mongoose');

const linksSchema = new mongoose.Schema({
    links: {
        type: [String],
        default: ["HOME", "Content", "About", "License"]
    }

})

module.exports = mongoose.model("Links", linksSchema);
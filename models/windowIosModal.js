const mongoose = require("mongoose");

const windowIosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    window: {
        type: String,
        // required:true
    },
    ios: {
        type: String,
        // required:true
    }
})
module.exports = mongoose.model("WindowIos", windowIosSchema)
const mongoose = require('mongoose');
//define the person schema object
const personSchama = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    work: {
        type: String,
        required: true,
        enum: ['Developer', 'Designer', 'Tester']

    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{10}$/
    },
    address: {
        type: String,
        required: true
    }
})

const Person = mongoose.model("Person", personSchama);
module.exports = Person;
const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
    feeduserfirstname: {
        type: String,
        required: true
    },
    feeduserlastname: {
        type: String,
        required: true
    },
    feeduseremail: {
        type: String,
        required: true,
        // unique: true
    },
    feedusercity: {
        type: String,
        required: true
    },
    feeduserstate: {
        type: String,
        required: true
    },
    userfeedzip: {
        type: String,
        required: true
    },
    userfeedconcern: {
        type: String,
        required: true
    }
});

module.exports = feedSchema;

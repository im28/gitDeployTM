const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: false
    }
    ,
    addressOne: {
        type: String,
        required: false
    }
    ,
    addressTwo: {
        type: String,
        required: false
    },
    postcode: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Register', registerSchema);
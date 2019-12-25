const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: "Null"
    },
    organization: {
        type: String,
        required: false,
        default: "Null"
    },
    addressOne: {
        type: String,
        required: false,
        default: "Null"
    },
    addressTwo: {
        type: String,
        required: false,
        default: "Null"
    },
    postcode: {
        type: String,
        required: false,
        default: "Null"
    },
    photo: {
        type: String,
        required: false,
        default: "Null"
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
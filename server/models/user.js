const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        required: false,
        default: 0
    },
    pointsGain: {
        type: Boolean,
        required: false,
        default: false
    },
    best1: {
        type: Boolean,
        required: false,
        default: false
    },
    best2: {
        type: Boolean,
        required: false,
        default: false
    },
    best3: {
        type: Boolean,
        required: false,
        default: false
    },
    role: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Roles'
        }
    ],
    gamifications: {
        type: Schema.Types.ObjectId,
        ref: 'Gamification'
    },
    experiences: {
        type: Schema.Types.ObjectId,
        ref: 'Experience'
    },
    information: {
        type: Schema.Types.ObjectId,
        ref: 'UserInfo'
    },
});

module.exports = mongoose.model('User', userSchema);
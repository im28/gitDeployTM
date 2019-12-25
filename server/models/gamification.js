const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gamificationSchema = new Schema({
    totalRoles: {
        type: Number,
        required: false,
        default: 0
    },
    points: {
        type: Number,
        required: false,
        default: 0
    },
    trophies: {
        type: Number,
        required: false,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Gamification', gamificationSchema);
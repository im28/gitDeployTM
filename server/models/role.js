const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    roleName: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: false,
        default: "Null"
    },
    wordOfTheDay: {
        type: String,
        required: false,
        default: "Null"
    },
    spTitle: {
        type: String,
        required: false,
        default: "Null"
    },
    spProjectNo: {
        type: String,
        required: false,
        default: "Null"
    },
    spPathway: {
        type: String,
        required: false,
        default: "Null"
    },
    spObjective: {
        type: String,
        required: false,
        default: "Null"
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: "Ongoing"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expiryDate: {
        type: Schema.Types.ObjectId,
        ref: 'Meeting'
    }
});

module.exports = mongoose.model('Roles', rolesSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingsSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: "Ongoing"
    },
    setRole: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Roles'
        }
    ]
});

module.exports = mongoose.model('Meeting', meetingsSchema);
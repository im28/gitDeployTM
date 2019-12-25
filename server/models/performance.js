const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const performanceSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Performance', performanceSchema);
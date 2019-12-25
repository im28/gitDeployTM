const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const experienceSchema= new Schema({
    toastmaster: {
        type: Number,
        required: false,
        default: 0
    } ,
    surgentAtArms: {
        type: Number,
        required: false,
        default: 0
    }, 
    grammarian: {
        type: Number,
        required: false,
        default: 0
    }, 
    ahCounter: {
        type: Number,
        required: false,
        default: 0
    }, 
    generalEvaluator: {
        type: Number,
        required: false,
        default: 0
    }, 
    topicsMaster: {
        type: Number,
        required: false,
        default: 0
    },
    timer:{ 
        type: Number,
        required: false,
        default: 0
    },
    speeches: {
        type: Number,
        required: false,
        default: 0
    }, 
    evaluations: {
        type: Number,
        required: false,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Experience', experienceSchema);
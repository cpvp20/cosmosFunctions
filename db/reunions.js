const mongoose = require('./mongodb-connect')

let reunionSchema = mongoose.Schema({
    id_reunion: {
        type: Number,
        required: true
    },
    registered_date: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    masks: {
        type: Boolean,
        required: true
    },
    open_space: {
        type: Boolean,
        required: true
    },
    risk: {
        type: Number,
        required: true
    },
});


let Reunion = mongoose.model('reunions', reunionSchema);

module.exports = Reunion;
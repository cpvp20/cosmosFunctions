const mongoose = require('./mongodb-connect')

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    registered_date: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    birth_date: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String
    },
    allergies: {
        type: Array
    },
    vaccinated: {
        type: Boolean,
        required: true
    },
    previously_infected: {
        type: Boolean,
        required: true
    },
    currently_infected: {
        type: Boolean,
        required: true
    },
    blood_type: {
        type: String
    },
});

let User = mongoose.model('users', userSchema);

module.exports = User;
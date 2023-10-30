const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create user schema

const RegisterTokenSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    confirm_email: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = RegisterToken = mongoose.model('register.token', RegisterTokenSchema)
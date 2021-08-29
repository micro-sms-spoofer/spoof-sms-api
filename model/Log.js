const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create user schema

const LogSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    victim: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    send_status: {
        type: Boolean,
        required: true,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Log = mongoose.model('logs', LogSchema)
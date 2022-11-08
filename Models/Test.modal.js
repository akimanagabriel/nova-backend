const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name: String,
    dateTaken: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Test', testSchema)
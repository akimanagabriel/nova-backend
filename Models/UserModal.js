const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    username: String,
    password: String,
    telephone: String,
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model('User', userSchema)
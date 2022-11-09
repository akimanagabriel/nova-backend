const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("Category", categorySchema)
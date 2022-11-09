const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    price: Number,
    image: [String],
    description: String,
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model('Product', productSchema)
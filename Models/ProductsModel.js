const mongoose = require('mongoose')
const Joi = require('joi')

const productSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    category: String,
    price: Number,
    image: [String],
    description: String,
}, {
    timestamps: true,
    versionKey: false,
})

const productValidator = (product) => {
    const validationSchema = Joi.object().keys({
        name: Joi.string().min(6).max(20).required(),
        price: Joi.number().min(1).required(),
        image: Joi.array().items(Joi.string().default([])),
        category: Joi.string().required(),
        description: Joi.string().min(20).max(300).required(),
    })

    return validationSchema.validate(product, { abortEarly: false });
}

module.exports.Product = mongoose.model('Product', productSchema)
module.exports.productValidator = productValidator
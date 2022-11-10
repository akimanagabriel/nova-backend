const { isValidObjectId } = require('mongoose')
const Product = require('../Models/ProductsModel')

const productController = {

    one: async (req, res) => {

        const product = await Product.findOne({ _id: req.params.id })
        if (product) return res.json(product)
        return res.status(404).json({ message: "Ooops no product found" })
    },

    all: async (req, res) => {
        const products = await Product.find().sort({ createdAt: -1 })
        return res.json(products)
    },

    create: async (req, res) => {
        const product = await Product(req.body)
        await product.save()
        return res.json({ message: 'product saved', data: product })
    },

    update: async (req, res) => {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { upsert: false })
        if (product) {
            const newProduct = await Product.findOne({ _id: req.params.id })
            return res.json({ message: "product modified successfully", data: newProduct })
        }
        return res.status(404).json({ message: "No product found" })
    },

    destroy: async (req, res) => {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (product) return res.json({ message: "product removed successfully", data: product })
        return res.status(404).json({ message: "No product found" })
    },

}

module.exports = productController
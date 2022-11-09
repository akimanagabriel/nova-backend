const express = require('express')
const router = express.Router()

const productsRoutes = require('./productRouter')


router.use('/products', productsRoutes)

module.exports = router
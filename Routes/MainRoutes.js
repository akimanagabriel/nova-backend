const express = require('express')
const { productRouter } = require('./productRouter')
const { userRouter } = require('./userRouter')
const router = express.Router()



router.use('/products', productRouter)
router.use('/users', userRouter)

module.exports = router
const express = require('express')
const { authRoutes } = require('./AuthRouter')
const { employeeRoutes } = require('./EmployeeRoutes')
const { productRouter } = require('./productRouter')
const { userRouter } = require('./userRouter')
const router = express.Router()



router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/auth', authRoutes)
router.use('/employees', employeeRoutes)

module.exports = router
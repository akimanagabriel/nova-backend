const express = require('express')
const { authController } = require('../Controllers/AuthController')
const route = express.Router()

route.post('/login', authController.login)
route.get('/getsession', authController.loginSession)
route.get('/logout', authController.logout)

module.exports.authRoutes = route
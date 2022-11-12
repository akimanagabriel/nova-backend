const express = require('express')
const { employeeController } = require('../Controllers/EmployeeController')
const { AuthMiddleware } = require('../Middlewares/authMiddleware')
const validateId = require('../Middlewares/idMiddleware')
const route = express.Router()

route.use(AuthMiddleware)

route.get('/', employeeController.all)
route.get('/:id', validateId, employeeController.one)
route.post('/', employeeController.create)
route.put('/:id', validateId, employeeController.update)
route.delete('/:id', validateId, employeeController.destroy)


module.exports.employeeRoutes = route
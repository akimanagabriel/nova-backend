const express = require('express')
const router = express.Router()

const validateId = require('../Middlewares/idMiddleware')
const userController = require('../Controllers/UserController')

//return all users
router.get('/', userController.all)

//return a single user
router.get('/:id', validateId, userController.one)

// create a user
router.post('/', userController.create)

// update a user
router.put('/:id', userController.update)

// delete a user
router.delete('/:id', userController.destroy)

module.exports.userRouter = router
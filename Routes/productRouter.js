const express = require('express')
const productController = require('../Controllers/ProductController')
const validateId = require('../Middlewares/idMiddleware')
const router = express.Router()


router.get('/', productController.all)      //all products
router.post('/', productController.create)  //create a product

router.get('/:id', validateId, productController.one)  //single product
router.put('/:id', validateId, productController.update) //update a product
router.delete('/:id', validateId, productController.destroy) //delete a product

module.exports = router
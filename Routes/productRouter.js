const express = require('express')
const router = express.Router()

const validateId = require('../Middlewares/idMiddleware')
const productController = require('../Controllers/ProductController')


router.get('/', productController.all)      //all products
router.post('/', productController.create)  //create a product

router.get('/:id', validateId, productController.one)  //single product
router.put('/:id', validateId, productController.update) //update a product
router.delete('/:id', validateId, productController.destroy) //delete a product

module.exports.productRouter = router
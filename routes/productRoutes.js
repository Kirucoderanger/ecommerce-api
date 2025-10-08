const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

let products = []; // In-memory product storage for demonstration purposes

router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts)
router.put('/:id', productController.updateProduct)
router.get('/:id', productController.getProductById)
router.delete('/:id', productController.deleteProduct)

module.exports = router;


const express = require('express')
const productController = require('../controllers/productController')
const auth = require('../middleware/authMiddleware');
//const { protect, auth } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createProduct, updateProduct } = require('../validators/product.validator');

const router = express.Router()

let products = []; // In-memory product storage for demonstration purposes

router.post('/', auth(['admin']), validate(createProduct), productController.createProduct)
router.get('/', auth(), productController.getAllProducts)
router.put('/:id', auth(['admin']), validate(updateProduct), productController.updateProduct)
router.get('/:id', auth(), productController.getProductById)
router.delete('/:id', auth(['admin']), productController.deleteProduct)

module.exports = router;


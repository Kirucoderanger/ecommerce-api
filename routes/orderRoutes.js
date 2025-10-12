const express = require('express')
const controller = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');
//const { protect, auth } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createOrder, updateOrder } = require('../validators/order.validator');



const router = express.Router();

router.post('/', auth(['customer']), validate(createOrder), controller.create);
router.get('/my', auth(['customer']), controller.getMyOrders);
router.get('/', auth(['admin']), controller.getAll);
router.put('/:id/status', auth(['admin']), validate(updateOrder), controller.updateStatus);
router.delete('/:id', auth(['admin']), controller.delete);

module.exports = router;

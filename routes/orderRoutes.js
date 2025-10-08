const express = require('express')
const controller = require('../controllers/orderController');
//const { auth, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', /*auth, authorize(['customer']),*/ controller.create);
router.get('/my', /*auth, authorize(['customer']),*/  controller.getMyOrders);
router.get('/', /*auth, authorize(['admin']),*/ controller.getAll);
router.put('/:id/status', /*auth, authorize(['admin']),*/ controller.updateStatus);
router.delete('/:id', /*auth, authorize(['admin']),*/ controller.delete);

module.exports = router;

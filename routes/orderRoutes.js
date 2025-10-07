const express = require('express')
const controller = require('../controllers/orderController');
const isAuthenticated = require('../middleware/authMiddleware');
//const { auth, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', /*auth, authorize(['customer']),*/ isAuthenticated,controller.create);
router.get('/my', /*auth, authorize(['customer']),*/ isAuthenticated, controller.getMyOrders);
router.get('/', /*auth, authorize(['admin']),*/ isAuthenticated,controller.getAll);
router.put('/:id/status', /*auth, authorize(['admin']),*/ isAuthenticated,controller.updateStatus);
router.delete('/:id', /*auth, authorize(['admin']),*/ isAuthenticated,controller.delete);

module.exports = router;

const express = require('express')
const controller = require('../controllers/inventoryController');
//const { auth, authorize } = require('../middleware/authMiddleware');
const isAuthenticated = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', /*auth, authorize(['admin']),*/ isAuthenticated,controller.create);
router.get('/', /*auth, authorize(['admin']),*/ isAuthenticated,controller.getAll); //get all inventories
router.get('/:productId', /*auth,*/ controller.get);
router.put('/:productId', /*auth, authorize(['admin']),*/ isAuthenticated, controller.update);
router.delete('/:productId', /*auth, authorize(['admin']),*/ isAuthenticated, controller.delete);

module.exports = router;

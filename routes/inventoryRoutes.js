const express = require('express')
const controller = require('../controllers/inventoryController');
const auth = require('../middleware/authMiddleware');
//const { protect, auth } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createInventory, updateInventory } = require('../validators/inventory.validator');
    

const router = express.Router();

<<<<<<< HEAD
router.post('/', /*auth, authorize(['admin']),*/ controller.create);
router.get('/:productId', /*auth,*/ controller.get);
router.put('/:productId', /*auth, authorize(['admin']),*/ controller.update);
router.delete('/:productId', /*auth, authorize(['admin']),*/ controller.delete);
=======
router.post('/', auth(['admin']), validate(createInventory), controller.create);
router.get('/', auth(['admin']), controller.getAll);
router.get('/:productId', auth(['admin']), controller.get);
router.put('/:productId', auth(['admin']), validate(updateInventory), controller.update);
router.delete('/:productId', auth(['admin']), controller.delete);
>>>>>>> dac65cd68b96205eeb68bce5632e9335abec89a4

module.exports = router;

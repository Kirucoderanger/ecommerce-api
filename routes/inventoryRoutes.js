const express = require('express')
const controller = require('../controllers/inventoryController');
const auth = require('../middleware/authMiddleware');
//const { protect, auth } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createInventory, updateInventory } = require('../validators/inventory.validator');
    

const router = express.Router();

router.post('/', auth(['admin']), validate(createInventory), controller.create);
router.get('/:productId', auth(['admin']), controller.get);
router.put('/:productId', auth(['admin']), validate(updateInventory), controller.update);
router.delete('/:productId', auth(['admin']), controller.delete);

module.exports = router;

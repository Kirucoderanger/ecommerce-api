const express = require('express')
const controller = require('../controllers/inventoryController');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createInventory, updateInventory } = require('../validators/inventory.validator');
    

const router = express.Router();

router.post('/', /*auth, authorize(['admin']),*/ controller.create);
router.get('/:productId', /*auth,*/ controller.get);
router.put('/:productId', /*auth, authorize(['admin']),*/ controller.update);
router.delete('/:productId', /*auth, authorize(['admin']),*/ controller.delete);

module.exports = router;

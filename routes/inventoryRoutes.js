const express = require('express')
const controller = require('../controllers/inventoryController');
//const { auth, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', /*auth, authorize(['admin']),*/ controller.create);
router.get('/', /*auth, authorize(['admin']),*/controller.getAll); //get all inventories
router.get('/:productId', /*auth,*/ controller.get);
router.put('/:productId', /*auth, authorize(['admin']),*/controller.update);
router.delete('/:productId', /*auth, authorize(['admin']),*/ controller.delete);

module.exports = router;

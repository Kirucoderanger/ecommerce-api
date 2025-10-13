const inventoryService = require('../services/inventoryService');
const asyncHandler = require('../middleware/asyncHandler') // to handle async errors in express routes

<<<<<<< HEAD
exports.create = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.createInventory(req.body);
=======
exports.create = async (req, res) => {
  const { productId, stock } = req.body;
  const inventory = await inventoryService.createInventory({ productId, stock });
>>>>>>> dac65cd68b96205eeb68bce5632e9335abec89a4
  res.status(201).json(inventory);
});

exports.get = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.getInventory(req.params.productId);
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
  res.json(inventory);
});

<<<<<<< HEAD
exports.getAll = asyncHandler(async (req, res) => {  //get all inventories
  const inventories = await inventoryService.getAllInventories();
  res.json(inventories);
});

exports.update = asyncHandler(async (req, res) => {
=======
exports.getAll = async (req, res) => {
  const inventory = await inventoryService.getAllInventory();
  res.json(inventory);
};

exports.update = async (req, res) => {
>>>>>>> dac65cd68b96205eeb68bce5632e9335abec89a4
  const inventory = await inventoryService.updateInventory(req.params.productId, req.body.stock);
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
  res.json(inventory);
});

exports.delete = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.deleteInventory(req.params.productId);
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
  res.json({ message: 'Inventory deleted successfully' });
});

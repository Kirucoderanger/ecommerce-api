const inventoryService = require('../services/inventoryService');
const asyncHandler = require('../middleware/asyncHandler') // to handle async errors in express routes

exports.create = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.createInventory(req.body);
  res.status(201).json(inventory);
});

exports.get = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.getInventory(req.params.productId);
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
  res.json(inventory);
});

exports.getAll = asyncHandler(async (req, res) => {  //get all inventories
  const inventories = await inventoryService.getAllInventories();
  res.json(inventories);
});

exports.update = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.updateInventory(req.params.productId, req.body.stock);
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
  res.json(inventory);
});

exports.delete = asyncHandler(async (req, res) => {
  const inventory = await inventoryService.deleteInventory(req.params.productId);
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
  res.json({ message: 'Inventory deleted successfully' });
});

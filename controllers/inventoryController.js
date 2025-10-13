const inventoryService = require('../services/inventoryService');

exports.create = async (req, res) => {
  const { productId, stock } = req.body;
  const inventory = await inventoryService.createInventory({ productId, stock });
  res.status(201).json(inventory);
};

exports.get = async (req, res) => {
  const inventory = await inventoryService.getInventory(req.params.productId);
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
  res.json(inventory);
};

exports.getAll = async (req, res) => {
  const inventory = await inventoryService.getAllInventory();
  res.json(inventory);
};

exports.update = async (req, res) => {
  const inventory = await inventoryService.updateInventory(req.params.productId, req.body.stock);
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
  res.json(inventory);
};
exports.delete = async (req, res) => {
  const inventory = await inventoryService.deleteInventory(req.params.productId);
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
  res.json({ message: 'Inventory deleted successfully' });
};

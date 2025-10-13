const inventory = require('../models/Inventory');

exports.createInventory = async (data) => {
  const inv = new inventory(data);
  return await inv.save();
};

exports.getAllInventory = async () => {
  return await inventory.find();
};

exports.getInventory = async (productId) => {
  return await inventory.findOne({ productId });
};

exports.updateInventory = async (productId, stock) => {
  return await inventory.findOneAndUpdate({ productId }, { stock }, { new: true });
};

exports.deleteInventory = async (productId) => {
  return await inventory.findOneAndDelete({ productId });
};

const Inventory = require('../models/Inventory');

exports.createInventory = async (data) => {
  const inventory = new Inventory(data);
  return await inventory.save();
};

exports.getInventory = async (productId) => {
  return await Inventory.findOne({ productId }).populate('productId');
};

exports.updateInventory = async (productId, stock) => {
  return await Inventory.findOneAndUpdate({ productId }, { stock }, { new: true });
};
exports.deleteInventory = async (productId) => {
  return await Inventory.findOneAndDelete({ productId });
};

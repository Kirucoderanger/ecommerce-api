const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

exports.createOrder = async (customerId, items) => {
  let total = 0;
  for (const item of items) {
    const inventory = await Inventory.findOne({ productId: item.productId });
    const product = await Product.findById(item.productId);
    if (!inventory || inventory.stock < item.quantity) {
      const err = new Error('Not enough stock');
      err.statusCode = 400;
      throw err;
    }
    inventory.stock -= item.quantity;
    await inventory.save();
    
    total += product.price * item.quantity;
  }

  const order = new Order({ customerId, items, total });
  return await order.save();
};

exports.getCustomerOrders = async (customerId) => {
  return await Order.find({ customerId }).populate('items.productId');
};

exports.getAllOrders = async () => {
  return await Order.find().populate('items.productId');
};

exports.updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};
exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};


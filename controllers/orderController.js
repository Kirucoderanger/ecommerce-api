const orderService = require('../services/orderService');

exports.create = async (req, res) => {
  const order = await orderService.createOrder(req.body.customerId, req.body.items);
  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await orderService.getCustomerOrders(req.body.customerId);
  res.json(orders);
};

exports.getAll = async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
};

exports.updateStatus = async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};
exports.delete = async (req, res) => {
  const order = await orderService.deleteOrder(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ message: 'Order deleted successfully' });
};

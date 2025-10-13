const orderService = require('../services/orderService');
const asyncHandler = require('../middleware/asyncHandler') // to handle async errors in express routes

exports.create = async (req, res) => {
  const order = await orderService.createOrder(req.body.customerId, req.body.items);
  res.status(201).json(order);
}

exports.getMyOrders = async (req, res) => {
  const customerId = req.params.id;
  const orders = await orderService.getCustomerOrders(customerId);
  res.json(orders);
}

exports.getAll = asyncHandler(async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});
exports.delete = asyncHandler(async (req, res) => {
  const order = await orderService.deleteOrder(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ message: 'Order deleted successfully' });
});

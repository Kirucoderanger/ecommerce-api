const orderService = require('../services/orderService');
const asyncHandler = require('../middleware/asyncHandler') // to handle async errors in express routes

<<<<<<< HEAD
exports.create = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.body.userId, req.body.items);
=======
exports.create = async (req, res) => {
  const order = await orderService.createOrder(req.body.customerId, req.body.items);
>>>>>>> dac65cd68b96205eeb68bce5632e9335abec89a4
  res.status(201).json(order);
});

<<<<<<< HEAD
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getCustomerOrders(req.body.userId);
=======
exports.getMyOrders = async (req, res) => {
  const customerId = req.params.id;
  const orders = await orderService.getCustomerOrders(customerId);
>>>>>>> dac65cd68b96205eeb68bce5632e9335abec89a4
  res.json(orders);
});

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

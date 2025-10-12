const product = require('../models/Product')
const asyncHandler = require('../middleware/asyncHandler')
const inventoryService = require('../services/inventoryService');

// Create a new product
exports.createProduct = asyncHandler(async (data) => {
  const newProduct = await product.create(data);
  return newProduct;
});

// Get all products
exports.getAllProducts = asyncHandler(async () => {
  const products = await product.find();
  return products;
});

// Get product by ID
exports.getProductById = asyncHandler(async (id) => {
  const foundProduct = await product.findById(id);
  return foundProduct;
});

// Update product
exports.updateProduct = asyncHandler(async (id, data) => {
  const updatedProduct = await product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  return updatedProduct;
});

// Delete product
exports.deleteProduct = asyncHandler(async (id) => {
  const deletedProduct = await product.findByIdAndDelete(id);
  return deletedProduct;
});

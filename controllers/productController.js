const product = require('../models/Product')
const asyncHandler = require('../middleware/asyncHandler')

//create product
exports.createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, sku, imageUrl } = req.body;
    const newProduct = await product.create({
        name,
        description,
        price,
        category,
        sku,
        imageUrl

    });
    res.status(201).json({
        message: 'Product created successfully',
        product: newProduct
    });
});

//get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
    const products = await product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

//get product by id
exports.getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const foundProduct = await product.findById(productId);
    if (!foundProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
        success: true,
        data: foundProduct
    });
});

//updating product
exports.updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category, sku, imageUrl } = req.body;
    const updatedProduct = await product.findByIdAndUpdate(
        productId,
        { name, description, price, category, sku, imageUrl },
        { new: true, runValidators: true }
    );
    if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct
    });
});

//deleting product
exports.deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const deletedProduct = await product.findByIdAndDelete(productId);
    if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
        message: 'Product deleted successfully'
    });
});

/*
const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
};
exports.getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};
exports.getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};
exports.updateProduct = async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};
exports.deleteProduct = async (req, res) => {
  const product = await productService.deleteProduct(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted successfully' });
};  
*/
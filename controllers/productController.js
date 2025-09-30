const product = require('../models/Product')
const asyncHandler = require('../middleware/asyncHandler')

//create product
exports.createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, sku, quantity } = req.body;
    const newProduct = await product.create({
        name,
        description,
        price,
        category,
        sku,
        quantity
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
    const { name, description, price, category, sku, quantity } = req.body;
    const updatedProduct = await product.findByIdAndUpdate(
        productId,
        { name, description, price, category, sku, quantity },
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

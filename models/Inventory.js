const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  //price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);

const joi = require('joi');

module.exports = {
  create: {
    body: joi.object({
      name: joi.string().min(2).required(),
      price: joi.number().min(0).required(),
      description: joi.string().min(10).optional(),
      category: joi.string().valid('electronics', 'clothing', 'accessories').required(),
      sku: joi.string().min(2).required(),
      imageUrl: joi.string().uri().required()
    })
  },
  update: {
    body: joi.object({
      name: joi.string().min(2).optional(),
      price: joi.number().min(0).optional(),
      description: joi.string().min(10).optional(),
      category: joi.string().valid('electronics', 'clothing', 'accessories').optional(),
      sku: joi.string().min(2).optional(),
      imageUrl: joi.string().uri().optional()
    })
  }
};

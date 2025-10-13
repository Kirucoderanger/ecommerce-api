const joi = require('joi');

module.exports = {
  create: {
    body: joi.object({
      customerId: joi.string().required(),
      items: joi.array().items(joi.object({
        productId: joi.string().required(),
        quantity: joi.number().min(1).required()
      })).required(),
      //totalAmount: joi.number().min(0).required()
    })
  },
  update: {
    body: joi.object({
      userId: joi.string().optional(),
      items: joi.array().items(joi.object({
        productId: joi.string().optional(),
        quantity: joi.number().min(1).optional()
      })).optional(),
      totalAmount: joi.number().min(0).optional()
    })
  }
};

const joi = require('joi');

module.exports = {
  create: {
    body: joi.object({
      productId: joi.string().required(),
      quantity: joi.number().min(1).required(),
      location: joi.string().min(2).required()
    })
  },
  update: {
    body: joi.object({
      productId: joi.string().optional(),
      quantity: joi.number().min(1).optional(),
      location: joi.string().min(2).optional()
    })
  }
};

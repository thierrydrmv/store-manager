const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const productSchema = Joi.string().min(5).required();

const salesSchema = Joi.object({
  productId: idSchema,
  quantity: idSchema,  
});

const editProductSchema = Joi.object({
  id: idSchema,
  name: productSchema,  
});

module.exports = { idSchema, productSchema, salesSchema, editProductSchema };
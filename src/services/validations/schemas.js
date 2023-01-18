const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const productSchema = Joi.string().min(5).required();

const salesSchema = Joi.object({
  productId: idSchema.label('productId'),
  quantity: idSchema.label('quantity'),  
}).messages({
  'any.required': '{{#label}} is required',
});

const arraySalesSchema = Joi.array().items(salesSchema);

const editProductSchema = Joi.object({
  id: idSchema,
  name: productSchema,  
});

module.exports = { idSchema, productSchema, salesSchema, editProductSchema, arraySalesSchema };
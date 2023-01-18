const { idSchema, productSchema, salesSchema, editProductSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateProduct = (product) => {
  const { error } = productSchema.validate(product);
  if (error) {
    return {
      type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: '' };
};

const validateSale = (_id, itemsSold) => {
  const { error } = itemsSold.map((sale) => salesSchema.validate(sale)); 
  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }
  return { type: null, message: '' };
};

const validateEditProduct = (id, name) => {
  const { error } = editProductSchema.validate({ id, name });
  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = { validateId, validateProduct, validateSale, validateEditProduct };
const { idSchema, productSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateProduct = (product) => {
  const { error } = productSchema.validate(product);
  if (error) {
    return {
      type: 'INVALID_VALUE', message: error.message,
    };
  }
  return { type: null, message: '' };
};

module.exports = { validateId, validateProduct };
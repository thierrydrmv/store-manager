const { idSchema, productSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
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

module.exports = { validateId, validateProduct };
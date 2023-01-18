const { idSchema, productSchema, editProductSchema, arraySalesSchema } = require('./schemas');

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

const validateSale = async (itemsSold) => {
  const { error } = arraySalesSchema.validate(itemsSold);
  const allQuantityValues = itemsSold.every((item) => item.quantity > 0);
  const haveQuantity = itemsSold.every((item) => 'quantity' in item);
  if (!haveQuantity) {
    return { type: 'INVALID_OBJECT', message: error.message };
  }
  if (error && allQuantityValues) {
    return { type: 'INVALID_OBJECT', message: error.message };
  }
  if (!allQuantityValues) {
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
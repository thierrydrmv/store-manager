const { salesModel } = require('../models');
const schema = require('./validations/validateInputValues');

const findAll = async () => {
  const products = await salesModel.findAll();
  return { type: null, message: products };
};

const findById = async (salesId) => {
  const error = schema.validateId(salesId);
  if (error.type) return error;

  const product = await salesModel.findById(salesId);
  if (!product.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: product };
};

module.exports = { findAll, findById };
const { salesModel } = require('../models');
const schema = require('./validations/validateInputValues');

const findAll = async () => {
  const products = await salesModel.findAll();
  return { type: null, message: products };
};

const findById = async (salesId) => {
  const error = schema.validateId(salesId);
  if (error.type) return error;

  const sale = await salesModel.findById(salesId);
  if (!sale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const createSale = async (id, itemsSold) => {
  const error = schema.validateSale(id, itemsSold);
  if (error.type) return error;

  const sale = await salesModel.createSale({ id, itemsSold });
  return { type: null, message: sale };
};

module.exports = { findAll, findById, createSale };
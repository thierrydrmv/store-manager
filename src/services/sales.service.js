const { salesModel, productsModel } = require('../models');
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

const createSale = async (itemsSold) => {
  const error = await schema.validateSale(itemsSold);
  if (error.type) return error;
  const array = itemsSold.map((item) => productsModel.findById(item.productId));
  const productIdValidation = await Promise.all(array);

  const productIdNotFound = productIdValidation.map((item) => item === undefined);
  
  if (productIdNotFound.some((i) => i === true)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  
  const id = await salesModel.saleId();
  const newSale = itemsSold.map((item) => salesModel.createSale(item, id));
  await Promise.all(newSale);
  return { type: null, message: { id, itemsSold: await salesModel.getSaleById(id) } };
};

const editSale = async (sale, id) => {
  const error = await schema.validateSale(sale);
  if (error.type) return error;
  const array = sale.map((item) => productsModel.findById(item.productId));
  const productIdValidation = await Promise.all(array);

  const productIdNotFound = productIdValidation.map((item) => item === undefined);
  
  if (productIdNotFound.some((i) => i === true)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const findSale = await salesModel.findById(id);
  if (!findSale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const newSale = sale.map((item) => salesModel.editSale(item, id));
  await Promise.all(newSale);
  return {
    type: null,
message:
      { saleId: Number(id), itemsUpdated: await salesModel.getSaleById(id) },
  };

  // const result = await salesModel.editSale({ sale, id });
  // console.log(result);
  // return { type: null, message: result };
};

const deleteSale = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const sale = await salesModel.findById(id);
  if (!sale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const result = await salesModel.deleteSale(id);
  return { type: null, message: result };
};

module.exports = { findAll, findById, createSale, deleteSale, editSale };
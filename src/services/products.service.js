const { productsModel } = require('../models');
const schema = require('./validations/validateInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const findByName = async (productName) => {
  const product = await productsModel.findByName(productName);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateProduct(name);
  if (error.type) return error;

  const addProduct = await productsModel.createProduct(name);
  return { type: null, message: addProduct };
};

const editProduct = async (id, name) => {
  const error = schema.validateEditProduct(id, name);
  if (error.type) return error;
  
  const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const result = await productsModel.editProduct({ id, name });
  return { type: null, message: result };
};

const deleteProduct = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

 const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const result = await productsModel.deleteProduct(id);
  return { type: null, message: result };
};

module.exports = { findAll, findById, createProduct, editProduct, deleteProduct, findByName }; 
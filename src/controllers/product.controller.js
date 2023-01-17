const { productsService } = require('../services');
const mapError = require('../utils/errorMap');

const allProducts = async (_req, res) => {
  const { message } = await productsService.findAll();
  // if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  if (type) return res.status(mapError(type)).json({ message });

  const newProduct = await productsService.findById(message);
  return res.status(201).json(newProduct.message);
};

module.exports = { allProducts, getProduct, createProduct };
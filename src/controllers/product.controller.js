const { productsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const allProducts = async (_req, res) => {
  const { message, type } = await productsService.findAll();
  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = { allProducts, getProduct };
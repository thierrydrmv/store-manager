const { salesService } = require('../services');
const mapError = require('../utils/errorMap');

const allSales = async (_req, res) => {
  const { message } = await salesService.findAll();

  return res.status(200).json(message);
};

const getSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createSales = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.createSale(body);
  if (type) return res.status(mapError(type)).json({ message });
  
  return res.status(201).json(message);
};

const deleteSeal = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).end();
};

module.exports = { allSales, getSales, createSales, deleteSeal };
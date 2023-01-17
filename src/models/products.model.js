const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM products');

  return result;
};

const findById = async (productId) => {
  const [[result]] = await conn.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return result;
};

module.exports = { findAll, findById };
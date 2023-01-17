const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM products');

  return result;
};

const findById = async (productId) => {
  const [[result]] = await conn.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return result;
};

const createProduct = async (product) => {
   const [{ insertId }] = await conn.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product],
  );

  return insertId;
};

module.exports = { findAll, findById, createProduct };
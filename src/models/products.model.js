const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM products');

  return result;
};

const findById = async (productId) => {
  const [[result]] = await conn.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return result;
};

const findByName = async (productName) => {
  const [result] = await conn.execute(
    `SELECT * FROM products WHERE name LIKE '%${productName}%'`,
);
  return result;
};

const createProduct = async (product) => {
   const [{ insertId }] = await conn.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product],
  );

  return insertId;
};

const editProduct = async (product) => {
  await conn.execute(
      'UPDATE products SET name = ? WHERE id = ?',
      [product.name, product.id],
  );
  return { id: product.id, name: product.name };
};

const deleteProduct = async (id) => {
  await conn.execute(
    'DELETE FROM products WHERE id = ?', [id],
  );
};

module.exports = { findAll, findById, createProduct, editProduct, deleteProduct, findByName };
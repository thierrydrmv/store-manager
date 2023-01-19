const camelize = require('camelize');
const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity  
    FROM sales_products sp LEFT JOIN sales s ON sp.sale_id = s.id`,
);

  return camelize(result);
};

const findById = async (saleId) => {
  const [result] = await conn.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
    FROM sales_products sp LEFT JOIN sales s ON sp.sale_id = s.id WHERE sp.sale_id = ?`,
     [saleId],
);

  return camelize(result);
};

const getSaleById = async (saleId) => {
  const [result] = await conn.execute(
    'SELECT product_id, quantity FROM sales_products WHERE sale_id = ?',
    [saleId],
  );

  return camelize(result);
};

const saleId = async () => {
  const [{ insertId }] = await conn.execute('INSERT INTO sales (date) VALUE (?) ', [new Date()]);
  return insertId;
};

const createSale = async ({ productId, quantity }, id) => {
  await conn.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, productId, quantity],
  );
};

const editSale = async (sale, id) => {
  await conn.execute(
    'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ? AND product_id = ?',
    [sale.productId, sale.quantity, id, sale.productId],
  );
};

const deleteSale = async (id) => {
  await conn.execute(
    'DELETE FROM sales WHERE id = ?', [id],
  );
};

module.exports = { findAll, findById, createSale, deleteSale, editSale, saleId, getSaleById };
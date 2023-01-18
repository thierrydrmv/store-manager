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

const createSale = async ({ itemsSold }) => {
  const [{ insertId }] = await conn.execute('INSERT INTO sales (date) VALUE (?) ', [new Date()]);
  await Promise.all(itemsSold.map(async (sale) => conn.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, sale.productId, sale.quantity],
  )));
  return { id: insertId, itemsSold: await getSaleById(insertId) };
};

module.exports = { findAll, findById, createSale };
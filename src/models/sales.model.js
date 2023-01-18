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

// const createSale = async (sales) => {
//   const array = sales.map(async (sale) => {
//     const columns = Object.keys(sale).join(', ');
  
//     const placeholders = Object.keys(sale)
//       .map((_key) => '?')
//       .join(', ');
  
//     const [{ insertId }] = await conn.execute(
//       `INSERT INTO sale_products (${columns}) VALUE (${placeholders})`,
//       [...Object.values(sale)],
//     );
//   });

//   return insertId;
// };

module.exports = { findAll, findById };
const { pool } = require('../config/db');
const format = require('pg-format');

const productLimits = async ({ limits = 10}) => {
    const query = "SELECT * FROM inventario LIMIT $1";
    const { rows } = await pool.query(query, [limits]);
    return rows;
};

const productPage = async ({ limits = 3, page = 0}) => {
const offset = page * limits;
const formatQuery = format('SELECT * FROM inventario LIMIT %s OFFSET %s', limits, offset);
const { rows } = await pool.query(formatQuery);
return rows;
};

const productOrderBy = async ({ limits = 3, page = 0, order_by = "stock_ASC"}) => {
const [campo, direccion] = order_by.split("_");
const offset = page * limits;
const formatQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
const { rows } = await pool.query(formatQuery);
return rows;
};

module.exports = {
    productLimits,
    productPage,
    productOrderBy
};
const { pool } = require('../config/db');
const format = require('pg-format');

const productQueryString = async ({ limits = 10, page = 1, order_by = "stock_ASC"}) => {
    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    const formatQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
    const { rows } = await pool.query(formatQuery);
    return rows;
    };

module.exports = { productQueryString };
const { pool } = require('../config/db');
const format = require('pg-format');

const getJoyasAllFields = async (precio_min, precio_max, categoria, metal) => {
  let filtros = [];
  let values = [];

  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    filtros.push(`${campo} ${comparador} $${values.length}`);
  };

  if (precio_min) {
    agregarFiltro('precio', '>=', precio_min);
  }
  if (precio_max) {
    agregarFiltro('precio', '<=', precio_max);
  }
  if (categoria) {
    agregarFiltro('categoria', '=', categoria);
  }
  if (metal) {
    agregarFiltro('metal', '=', metal);
  }
  let query = 'SELECT * FROM inventario';

  if (filtros.length) {
    filtros = filtros.join(' AND ');
    query += ` WHERE ${filtros}`;
  }

  const { rows: joyas } = await pool.query(query, values);
  return joyas;
};

const productQueryString = async ({
  limits = 10,
  page = 1,
  order_by = 'stock_ASC',
}) => {
  const [campo, direccion] = order_by.split('_');
  const offset = (page - 1) * limits;
  const formatQuery = format(
    'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
    campo,
    direccion,
    limits,
    offset
  );
  const { rows } = await pool.query(formatQuery);
  return rows;
};

module.exports = {
  getJoyasAllFields,
  productQueryString,
};

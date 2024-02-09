const { pool } = require('../config/db');
const format = require('pg-format');

const getJoyasAllFields = async (precio_min, precio_max, categoria, metal) => {
  console.log(precio_min, precio_max, categoria, metal);
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
  console.log(filtros);
  if (filtros.length) {
    filtros = filtros.join(' AND ');
    query += ` WHERE ${filtros}`;
  }
  console.log(query, values);
  const { rows: joyas } = await pool.query(query, values);
  return joyas;
};

module.exports = {
  getJoyasAllFields,
};

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

//prueba de conexion con Base dato

const getData = async () => {
  try {
    const res = await pool.query('select NOW()');
    console.log(res.rows);
  } catch (error) {
    console.log('Error al conectar con la base de datos', error);
  }
};

getData();

module.exports = { pool };

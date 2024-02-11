const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { getJoyasAllFields } = require('../querys/querys');
const { productQueryString } = require('../querys/queryStrings');
const { validarCampos } = require('../middlewares');

const prepararHATEOAS = (inventario) => {
  const total = inventario.length;

  let stock = 0;
  inventario.forEach((item) => {
    stock += item.stock;
  });

  const results = inventario.map((m) => {
    return {
      name: m.nombre,
      href: `/joyas/joya/${m.id}`,
    };
  });

  //data de salida
  const HATEOAS = {
    totalJoyas: total,
    totalStock: stock,
    results,
  };

  return HATEOAS;
};

router.get(
  '/filtros',
  //Validaciones
  [
    check(
      'precio_min',
      " El valor del parámetro 'precio_min' debe ser numérico"
    ).isNumeric(),
    check(
      'precio_max',
      " El valor del parámetro 'precio_max' debe ser numérico"
    ).isNumeric(),
    check(
      'metal',
      ' El valor del parámetro metal no corresponde a un metal válido'
    ).isIn(['oro', 'plata', 'bronce']),
    check(
      'categoria',
      ' El valor del parámetro categoria no corresponde a una categoría válida'
    ).isIn(['collar', 'aros', 'anillo']),
    validarCampos,
  ],
  async (req, res) => {
    try {
      const { precio_min, precio_max, categoria, metal } = req.query;
      const joyas = await getJoyasAllFields(
        precio_min,
        precio_max,
        categoria,
        metal
      );
      res.send(joyas);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.get(
  '/',
  [
    check('page', 'El valor de la página debe ser numérico').isNumeric(),
    check('limits', 'El valor de los límites debe ser numérico').isNumeric(),
    check(
      'order_by',
      'El valor del parámetro order_by no corresponde a una ordenación válida'
    ).isIn([
      'id_ASC',
      'id_DESC',
      'nombre_ASC',
      'nombre_DESC',
      'stock_ASC',
      'stock_DESC',
      'precio_ASC',
      'precio_DESC',
    ]),
    validarCampos,
  ],
  async (req, res) => {
    try {
      const queryStrings = req.query;
      const inventario = await productQueryString(queryStrings);
      console.log(inventario);
      const HATEOAS = prepararHATEOAS(inventario);
      res.json(HATEOAS);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

module.exports = router;

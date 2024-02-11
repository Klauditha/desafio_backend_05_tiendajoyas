const express = require('express');
const router = express.Router();
const { getJoyasAllFields } = require('../querys/querys');
const { productQueryString } = require('../querys/queryStrings');

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

router.get('/filtros', async (req, res) => {
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
});

router.get('/', async (req, res) => {
  try {
    const queryStrings = req.query;
    const inventario = await productQueryString(queryStrings);
    console.log(inventario);
    const HATEOAS = prepararHATEOAS(inventario);
    res.json(HATEOAS);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

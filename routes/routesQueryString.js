const express = require("express");
const router = express.Router();
const { productQueryString } = require("../querys/queryStrings");

const prepararHATEOAS = (inventario) => {
    const total = inventario.length;

    let stock = 0;
    inventario.forEach(item => {
        stock += item.stock;
    });

    const results = inventario.map((m) => {
        return {
            name: m.nombre,
            href: `/joyas/joya/${m.id}`,
        }
    });   

    //data de salida
    const HATEOAS = {
        "totalJoyas": total,
        "totalStock": stock,
        results
    };

    return HATEOAS
};

router.get("/", async (req, res) => {
    try {
        const queryStrings = req.query;
        const inventario = await productQueryString(queryStrings);
        console.log(inventario);
        const HATEOAS = prepararHATEOAS(inventario)
        res.json(HATEOAS);
        
    } catch (error) {
        res.status(500).send({ error: error.message });        
    };
});


module.exports = router
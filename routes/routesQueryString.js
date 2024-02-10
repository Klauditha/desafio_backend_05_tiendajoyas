const express = require("express");
const router = express.Router();
const { productQueryString } = require("../querys/queryStrings");

const prepararHATEOAS = (inventario) => {
    const total = inventario.length;
    const results = inventario.map((m) => {
        return {
            name: m.nombre,
            href: `/joyas/joya/${m.id}`,
        }
    }).slice(0, 4);    

    //data de salida
    const HATEOAS = {
        "totalJoyas": total,
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
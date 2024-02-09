const express = require("express");
const router = express.Router();
const { getJoyasAllFields } = require("../querys/querys");

router.get("/filtros", async (req, res) => {
    try {
        const { precio_min, precio_max, categoria, metal} = req.query;
        const joyas = await getJoyasAllFields(precio_min, precio_max, categoria, metal);
        res.send(joyas);

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

module.exports = router
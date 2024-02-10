const express = require("express");
const router = express.Router();
const { productLimits, productPage, productOrderBy } = require("../querys/queryStrings");
/*
router.get("/", async (req, res) => {
    console.log(req.query);
    res.send("soy raiz");
});
*/

router.get("/limits", async (req, res) => {
    try {
        const queryStrings = req.query
        const inventario = await productLimits(queryStrings)
        res.json(inventario);
        
    } catch (error) {
        res.status(500).send({ error: error.message });        
    };    
});


router.get("/page", async (req, res) => {
    try {
        const queryStrings = req.query
        const inventario = await productPage(queryStrings)
        res.json(inventario);
        
    } catch (error) {
        res.status(500).send({ error: error.message });        
    };    
});


router.get("/order_by", async (req, res) => {
    try {
        const queryStrings = req.query
        const inventario = await productOrderBy(queryStrings)
        res.json(inventario);
        
    } catch (error) {
        res.status(500).send({ error: error.message });        
    };    
});


module.exports = router
const express = require("express");
const router = express.Router();
const joyasRoutes = require("./joyasRoutes");
const routesQueryString = require("./routesQueryString");

router.use("/joyas", joyasRoutes, routesQueryString);
router.get("*", (req, res) => {
    res.status(404).send("Ruta no encontrada");
});

module.exports = router;
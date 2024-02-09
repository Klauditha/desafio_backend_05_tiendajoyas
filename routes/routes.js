const express = require("express");
const router = express.Router();
const joyasRoutes = require("./joyasRoutes");

router.use("/joyas", joyasRoutes);

router.get("/joyas", (req, res) => {
    res.status(200).json({message: "ruta joyas ok"})
})

module.exports = router;
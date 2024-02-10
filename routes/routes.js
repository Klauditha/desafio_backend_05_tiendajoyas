const express = require("express");
const router = express.Router();
const joyasRoutes = require("./joyasRoutes");
const routesQueryString = require("./routesQueryString");

router.use("/joyas", joyasRoutes, routesQueryString);

module.exports = router;
const express = require('express');
const router = express.Router();
const joyasRoutes = require('./joyasRoutes');
const { reportQuery } = require('../middlewares/report.handlers');

router.use('/joyas', reportQuery, joyasRoutes);

module.exports = router;

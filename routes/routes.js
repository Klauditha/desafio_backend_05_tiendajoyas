const express = require('express');
const router = express.Router();
const joyasRoutes = require('./joyasRoutes');

router.use('/joyas', joyasRoutes);

module.exports = router;

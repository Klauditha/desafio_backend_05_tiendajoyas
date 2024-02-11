const express = require('express');
const router = express.Router();
const joyasRoutes = require('./joyasRoutes');

router.use('/joyas', joyasRoutes);
router.get('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = router;

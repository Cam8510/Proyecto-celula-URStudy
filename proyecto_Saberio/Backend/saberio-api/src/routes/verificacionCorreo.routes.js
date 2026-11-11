const express = require('express');

const {
  solicitarVerificacion,
  confirmarVerificacion,
} = require('../controllers/verificacionCorreo.controller');

const router = express.Router();

router.post('/solicitar', solicitarVerificacion);
router.post('/confirmar', confirmarVerificacion);

module.exports = router;
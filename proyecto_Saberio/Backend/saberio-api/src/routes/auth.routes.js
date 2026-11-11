const { Router } = require('express');

const controlador = require('../controllers/auth.controller');
const validarRegistro = require('../middlewares/validarRegistro');

const router = Router();

router.post(
  '/registro',
  validarRegistro,
  controlador.registrar
);

module.exports = router;
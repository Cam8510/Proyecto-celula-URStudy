const servicio = require('../services/auth.service');

async function registrar(req, res) {
  const usuario = await servicio.registrarCuenta(
    res.locals.registro
  );

  res.status(201).json({
    mensaje:
      'Cuenta creada con correo pendiente de verificación. El envío del código todavía no está implementado.',
    usuario,
  });
}

module.exports = { registrar };
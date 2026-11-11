const mongoose = require('mongoose');
const HttpError = require('../utils/HttpError');

function rutaNoEncontrada(req, res, next) {
  next(
    new HttpError(
      404,
      `La ruta ${req.method} ${req.path} no existe`,
      'RUTA_NO_ENCONTRADA'
    )
  );
}

function responderError(res, status, codigo, mensaje) {
  return res.status(status).json({
    error: {
      codigo,
      mensaje,
    },
  });
}

function manejarErrores(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  // Errores controlados por Saberio.
  if (error instanceof HttpError) {
    return responderError(
      res,
      error.status,
      error.codigo,
      error.message
    );
  }

  // Errores del procesamiento del cuerpo JSON.
  if (error.type === 'entity.parse.failed') {
    return responderError(
      res,
      400,
      'JSON_INVALIDO',
      'El cuerpo de la petición contiene JSON inválido'
    );
  }

  if (error.type === 'entity.too.large') {
    return responderError(
      res,
      413,
      'CUERPO_DEMASIADO_GRANDE',
      'El cuerpo de la petición supera el tamaño permitido'
    );
  }

  // Datos que incumplen las reglas de un modelo.
  // No enviamos valores internos ni el error completo.
  if (error instanceof mongoose.Error.ValidationError) {
    return responderError(
      res,
      400,
      'DATOS_INVALIDOS',
      'Los datos no cumplen las reglas del modelo'
    );
  }

  // Conversión fallida, por ejemplo un ObjectId inválido.
  if (error instanceof mongoose.Error.CastError) {
    return responderError(
      res,
      400,
      'FORMATO_INVALIDO',
      'Uno de los datos tiene un formato inválido'
    );
  }

  // Conflicto con un índice único de MongoDB.
  if (error.code === 11000) {
    return responderError(
      res,
      409,
      'RECURSO_DUPLICADO',
      'La operación entra en conflicto con un registro existente'
    );
  }

  // Registro mínimo: no imprimir cuerpos, contraseñas ni URI.
  console.error('Error no controlado:', {
  nombre: error.name || 'Error',
  codigo: error.code,
  metodo: req.method,
});

// Diagnóstico temporal solo en desarrollo.
// Revisar localmente: puede contener datos internos.
if (process.env.NODE_ENV !== 'production') {
  console.error('Detalle local:', error.message);
}

  return responderError(
    res,
    500,
    'ERROR_INTERNO',
    'Error interno del servidor'
  );
}

module.exports = {
  rutaNoEncontrada,
  manejarErrores,
};
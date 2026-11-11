const {
  DOMINIOS_INSTITUCIONALES,
} = require('../../config/dominiosInstitucionales');

const dominiosPermitidos = new Set(DOMINIOS_INSTITUCIONALES);

function validarCorreoInstitucional(valor) {
  if (typeof valor !== 'string') {
    return {
      valido: false,
      mensaje: 'El correo debe ser un texto',
    };
  }

  // Política de normalización de Saberio.
  const correo = valor.trim().toLowerCase();

  if (correo.length === 0) {
    return {
      valido: false,
      mensaje: 'El correo es obligatorio',
    };
  }

  if (correo.length > 254) {
    return {
      valido: false,
      mensaje: 'El correo es demasiado largo',
    };
  }

  // Comprobación básica para los correos admitidos por Saberio.
  // No sustituye la verificación del buzón por código.
  const formatoBasico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formatoBasico.test(correo)) {
    return {
      valido: false,
      mensaje: 'El correo no tiene un formato válido',
    };
  }

  const [parteLocal, dominio] = correo.split('@');

  if (
    parteLocal.length > 64 ||
    parteLocal.startsWith('.') ||
    parteLocal.endsWith('.') ||
    parteLocal.includes('..')
  ) {
    return {
      valido: false,
      mensaje: 'El correo no tiene un formato válido',
    };
  }

  if (!dominiosPermitidos.has(dominio)) {
    return {
      valido: false,
      mensaje: 'El dominio del correo no está autorizado en Saberio',
    };
  }

  return {
    valido: true,
    correo,
    dominio,
  };
}

module.exports = { validarCorreoInstitucional };
const bcrypt = require('bcrypt');
const HttpError = require('../utils/HttpError');

const COSTO_BCRYPT = 12;
const MAX_BYTES_PASSWORD = 72;

function tieneLongitudAdmitida(password) {
  return (
    typeof password === 'string' &&
    password.length > 0 &&
    Buffer.byteLength(password, 'utf8') <= MAX_BYTES_PASSWORD
  );
}

async function generarPasswordHash(password) {
  if (!tieneLongitudAdmitida(password)) {
    throw new HttpError(
      400,
      'La contraseña debe ser un texto no vacío de hasta 72 bytes',
      'PASSWORD_INVALIDO'
    );
  }

  return bcrypt.hash(password, COSTO_BCRYPT);
}

async function comprobarPassword(password, passwordHash) {
  if (!tieneLongitudAdmitida(password)) {
    return false;
  }

  if (typeof passwordHash !== 'string' || !passwordHash) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
}

module.exports = {
  generarPasswordHash,
  comprobarPassword,
};
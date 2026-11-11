const crypto = require('crypto');

const VIGENCIA_SESION_MS = 60 * 60 * 1000;

let sesion = null;

function limpiarSesionExpirada() {
  if (!sesion) {
    return;
  }

  const ahora = Date.now();

  if (ahora >= sesion.expiraEn) {
    sesion = null;
  }
}

function guardarSesion({ cuenta, token }) {
  if (!cuenta || typeof cuenta !== 'object') {
    throw new Error('Cuenta de Microsoft inválida.');
  }

  if (!token || typeof token !== 'object' || typeof token.accessToken !== 'string') {
    throw new Error('Token de Microsoft inválido.');
  }

  const ahora = Date.now();

  sesion = {
    cuenta: {
      homeAccountId: cuenta.homeAccountId || null,
      username: String(cuenta.username || '').trim().toLowerCase(),
      name: cuenta.name || null,
    },
    token: {
      accessToken: token.accessToken,
      expiresOn: token.expiresOn || null,
      scopes: Array.isArray(token.scopes) ? [...token.scopes] : [],
    },
    expiraEn: ahora + VIGENCIA_SESION_MS,
  };
}

function obtenerSesion() {
  limpiarSesionExpirada();

  if (!sesion) {
    return null;
  }

  return {
    cuenta: { ...sesion.cuenta },
    token: { ...sesion.token },
    expiraEn: sesion.expiraEn,
  };
}

function obtenerCuentaAutorizada() {
  const sesionActual = obtenerSesion();

  if (!sesionActual) {
    return null;
  }

  return sesionActual.cuenta;
}

function estaAutorizada() {
  return obtenerSesion() !== null;
}

function cerrarSesion() {
  sesion = null;
}

function generarEstado() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = {
  guardarSesion,
  obtenerSesion,
  obtenerCuentaAutorizada,
  estaAutorizada,
  cerrarSesion,
  generarEstado,
};
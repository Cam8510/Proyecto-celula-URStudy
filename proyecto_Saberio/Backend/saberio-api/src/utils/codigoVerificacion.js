const {
  randomInt,
  randomBytes,
  createHmac,
  timingSafeEqual,
} = require('node:crypto');

const DURACION_CODIGO_MS = 10 * 60 * 1000;

function obtenerClave() {
  const clave = process.env.EMAIL_VERIFICATION_SECRET;

  if (
    typeof clave !== 'string' ||
    !/^[a-f0-9]{64}$/i.test(clave)
  ) {
    throw new Error(
      'EMAIL_VERIFICATION_SECRET debe contener 64 caracteres hexadecimales'
    );
  }

  return Buffer.from(clave, 'hex');
}

function calcularHuella(usuarioId, nonce, codigo) {
  const contenido = JSON.stringify([
    'verificacion-correo',
    String(usuarioId),
    nonce,
    codigo,
  ]);

  return createHmac('sha256', obtenerClave())
    .update(contenido)
    .digest('hex');
}

function generarCodigoVerificacion(usuarioId) {
  if (!usuarioId) {
    throw new Error(
      'Se necesita el identificador del usuario para generar el código'
    );
  }

  const codigo = randomInt(0, 1000000)
    .toString()
    .padStart(6, '0');

  const nonce = randomBytes(16).toString('hex');
  const creadoEn = new Date();

  return {
    // Solo para entregar al servicio de correo.
    codigo,

    // Estos datos sí podrán guardarse en MongoDB.
    huella: calcularHuella(usuarioId, nonce, codigo),
    nonce,
    creadoEn,
    venceEn: new Date(
      creadoEn.getTime() + DURACION_CODIGO_MS
    ),
  };
}

function coincideCodigo({
  usuarioId,
  codigo,
  nonce,
  huella,
}) {
  if (
    !usuarioId ||
    typeof codigo !== 'string' ||
    !/^\d{6}$/.test(codigo) ||
    typeof nonce !== 'string' ||
    !/^[a-f0-9]{32}$/i.test(nonce) ||
    typeof huella !== 'string' ||
    !/^[a-f0-9]{64}$/i.test(huella)
  ) {
    return false;
  }

  const huellaCalculada = calcularHuella(
    usuarioId,
    nonce,
    codigo
  );

  return timingSafeEqual(
    Buffer.from(huellaCalculada, 'hex'),
    Buffer.from(huella, 'hex')
  );
}

module.exports = {
  generarCodigoVerificacion,
  coincideCodigo,
};
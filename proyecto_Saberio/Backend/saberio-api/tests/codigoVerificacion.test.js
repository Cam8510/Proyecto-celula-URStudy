const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');

// Clave temporal exclusiva de esta prueba.
// No utiliza ni modifica la clave real del archivo .env.
process.env.EMAIL_VERIFICATION_SECRET =
  randomBytes(32).toString('hex');

const {
  generarCodigoVerificacion,
  coincideCodigo,
} = require('../src/utils/codigoVerificacion');

const usuarioId = 'usuario-ficticio-de-prueba';
const generado = generarCodigoVerificacion(usuarioId);

assert.match(generado.codigo, /^\d{6}$/);
assert.match(generado.huella, /^[a-f0-9]{64}$/);
assert.match(generado.nonce, /^[a-f0-9]{32}$/);

assert.equal(
  generado.venceEn.getTime() - generado.creadoEn.getTime(),
  10 * 60 * 1000
);

const datos = {
  usuarioId,
  codigo: generado.codigo,
  nonce: generado.nonce,
  huella: generado.huella,
};

assert.equal(coincideCodigo(datos), true);

// Construir un código distinto de forma determinista.
const codigoIncorrecto = (
  (Number(generado.codigo) + 1) % 1000000
)
  .toString()
  .padStart(6, '0');

assert.equal(
  coincideCodigo({
    ...datos,
    codigo: codigoIncorrecto,
  }),
  false
);

assert.equal(
  coincideCodigo({
    ...datos,
    usuarioId: 'otro-usuario',
  }),
  false
);

assert.equal(
  coincideCodigo({
    ...datos,
    codigo: 123456,
  }),
  false
);

assert.equal(
  coincideCodigo({
    ...datos,
    codigo: '12345',
  }),
  false
);

console.log(
  'Correcto: generación, duración y coincidencia criptográfica comprobadas'
);
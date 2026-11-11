const assert = require('node:assert/strict');

const validarRegistro = require('../src/middlewares/validarRegistro');
const HttpError = require('../src/utils/HttpError');

function ejecutarMiddleware(body) {
  const req = { body };
  const res = { locals: {} };

  let continuo = false;

  validarRegistro(req, res, () => {
    continuo = true;
  });

  assert.equal(continuo, true);

  return res.locals.registro;
}

const registroBase = {
  nombre: 'Persona de prueba',
  correo: 'persona@urosario.edu.co',
  password: 'EjemploSeguro123',
  rol: 'estudiante',
};

// Registro válido y normalización.
const resultado = ejecutarMiddleware({
  ...registroBase,
  nombre: '  Persona de prueba  ',
  correo: '  PERSONA@UROSARIO.EDU.CO  ',
});

assert.equal(resultado.nombre, 'Persona de prueba');
assert.equal(resultado.correo, 'persona@urosario.edu.co');
assert.equal(resultado.password, registroBase.password);
assert.equal(resultado.rol, 'estudiante');

// Monitor también es un rol público permitido.
assert.equal(
  ejecutarMiddleware({
    ...registroBase,
    rol: 'monitor',
  }).rol,
  'monitor'
);

const casosInvalidos = [
  {
    descripcion: 'Cuerpo ausente',
    body: undefined,
    codigo: 'CUERPO_INVALIDO',
  },
  {
    descripcion: 'Cuerpo como arreglo',
    body: [],
    codigo: 'CUERPO_INVALIDO',
  },
  {
    descripcion: 'Nombre vacío',
    body: { ...registroBase, nombre: ' ' },
    codigo: 'NOMBRE_INVALIDO',
  },
  {
    descripcion: 'Correo no autorizado',
    body: { ...registroBase, correo: 'persona@gmail.com' },
    codigo: 'CORREO_INVALIDO',
  },
  {
    descripcion: 'Contraseña corta',
    body: { ...registroBase, password: 'Abc1' },
    codigo: 'PASSWORD_INVALIDO',
  },
  {
    descripcion: 'Contraseña que supera 72 bytes',
    body: {
      ...registroBase,
      password: 'A1' + 'ñ'.repeat(36),
    },
    codigo: 'PASSWORD_DEMASIADO_LARGO',
  },
  {
    descripcion: 'Registro como administrador',
    body: { ...registroBase, rol: 'admin' },
    codigo: 'ROL_INVALIDO',
  },
  {
    descripcion: 'Verificación manipulada',
    body: { ...registroBase, correoVerificado: true },
    codigo: 'CAMPOS_NO_PERMITIDOS',
  },
  {
    descripcion: 'Arreglo de roles manipulado',
    body: { ...registroBase, roles: ['admin'] },
    codigo: 'CAMPOS_NO_PERMITIDOS',
  },
];

for (const caso of casosInvalidos) {
  assert.throws(
    () => ejecutarMiddleware(caso.body),
    (error) =>
      error instanceof HttpError &&
      error.status === 400 &&
      error.codigo === caso.codigo,
    caso.descripcion
  );
}

console.log(
  `Correcto: 2 casos válidos y ${casosInvalidos.length} rechazos comprobados`
);
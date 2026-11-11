const HttpError = require('../utils/HttpError');

const {
  validarCorreoInstitucional,
} = require('../utils/validarCorreoInstitucional');

const CAMPOS_PERMITIDOS = new Set([
  'nombre',
  'correo',
  'password',
  'rol',
]);

function validarRegistro(req, res, next) {
  const datos = req.body;

  if (
    !datos ||
    typeof datos !== 'object' ||
    Array.isArray(datos)
  ) {
    throw new HttpError(
      400,
      'Debes enviar un objeto JSON con los datos de registro',
      'CUERPO_INVALIDO'
    );
  }

  const contieneCamposNoPermitidos = Object.keys(datos).some(
    (campo) => !CAMPOS_PERMITIDOS.has(campo)
  );

  if (contieneCamposNoPermitidos) {
    throw new HttpError(
      400,
      'La solicitud contiene campos no permitidos',
      'CAMPOS_NO_PERMITIDOS'
    );
  }

  const { nombre, correo, password, rol } = datos;

  // Nombre.
  if (typeof nombre !== 'string') {
    throw new HttpError(
      400,
      'El nombre es obligatorio',
      'NOMBRE_INVALIDO'
    );
  }

  const nombreNormalizado = nombre.trim();

  if (
    nombreNormalizado.length < 2 ||
    nombreNormalizado.length > 100
  ) {
    throw new HttpError(
      400,
      'El nombre debe tener entre 2 y 100 caracteres',
      'NOMBRE_INVALIDO'
    );
  }

  // Correo institucional.
  const resultadoCorreo = validarCorreoInstitucional(correo);

  if (!resultadoCorreo.valido) {
    throw new HttpError(
      400,
      resultadoCorreo.mensaje,
      'CORREO_INVALIDO'
    );
  }

  // Contraseña: conservar la regla del formulario actual.
  if (typeof password !== 'string') {
    throw new HttpError(
      400,
      'La contraseña es obligatoria',
      'PASSWORD_INVALIDO'
    );
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    throw new HttpError(
      400,
      'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número',
      'PASSWORD_INVALIDO'
    );
  }

  // Bcrypt tiene un límite de entrada de 72 bytes.
  if (Buffer.byteLength(password, 'utf8') > 72) {
    throw new HttpError(
      400,
      'La contraseña no puede superar 72 bytes',
      'PASSWORD_DEMASIADO_LARGO'
    );
  }

  // El registro público nunca asigna admin.
  if (rol !== 'estudiante' && rol !== 'monitor') {
    throw new HttpError(
      400,
      'Selecciona un rol válido: estudiante o monitor',
      'ROL_INVALIDO'
    );
  }

  // Datos revisados para el siguiente controlador.
  res.locals.registro = {
    nombre: nombreNormalizado,
    correo: resultadoCorreo.correo,
    password,
    rol,
  };

  next();
}

module.exports = validarRegistro;
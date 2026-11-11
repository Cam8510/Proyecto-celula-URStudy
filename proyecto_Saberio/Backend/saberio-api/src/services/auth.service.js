const Usuario = require('../../models/usuario.model');
const HttpError = require('../utils/HttpError');

const {
  generarPasswordHash,
} = require('./password.service');

async function registrarCuenta({ nombre, correo, password, rol }) {
  // Protección adicional: no confiar solo en el middleware.
  if (rol !== 'estudiante' && rol !== 'monitor') {
    throw new HttpError(
      400,
      'El rol de registro no es válido',
      'ROL_INVALIDO'
    );
  }

  // En esta etapa esperamos la inicialización del modelo
  // y de su índice único antes de insertar.
  await Usuario.init();

  const existe = await Usuario.exists({ correo });

  if (existe) {
    throw new HttpError(
      409,
      'No se pudo crear una cuenta nueva con estos datos. Si ya tienes una cuenta, inicia sesión.',
      'REGISTRO_NO_DISPONIBLE'
    );
  }

  const passwordHash = await generarPasswordHash(password);

  let usuario;

  try {
    usuario = await Usuario.create({
      nombre,
      correo,
      passwordHash,

      // El cliente envía un solo rol público por registro.
      roles: [rol],

      // Estos valores los establece el servidor.
      correoVerificado: false,
      correoVerificadoEn: null,
      estadoCuenta: 'habilitada',
      acreditacionMonitor: 'no_solicitada',
    });
  } catch (error) {
    // Dos peticiones simultáneas pueden superar exists().
    // El índice único es la protección definitiva.
    if (error.code === 11000) {
      throw new HttpError(
        409,
        'No se pudo crear una cuenta nueva con estos datos. Si ya tienes una cuenta, inicia sesión.',
        'REGISTRO_NO_DISPONIBLE'
      );
    }

    throw error;
  }

  // Respuesta explícita: nunca devolver password ni passwordHash.
  return {
    id: usuario._id.toString(),
    nombre: usuario.nombre,
    correo: usuario.correo,
    roles: [...usuario.roles],
    correoVerificado: usuario.correoVerificado,
  };
}

module.exports = { registrarCuenta };
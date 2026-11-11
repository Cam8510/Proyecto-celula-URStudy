const Usuario = require('../../models/usuario.model');

const {
  emitirCodigo,
  verificarCodigo,
} = require('../services/verificacionCorreo.service');

const {
  enviarCodigoVerificacion,
} = require('../services/correoMicrosoft.service');

const MENSAJE_SOLICITUD =
  'Si el correo corresponde a una cuenta elegible, enviamos un código de verificación.';

const MENSAJE_CONFIRMACION = 'Correo verificado correctamente.';

function normalizarCorreo(valor) {
  if (typeof valor !== 'string') {
    return null;
  }

  const correo = valor.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return null;
  }

  return correo;
}

function normalizarCodigo(valor) {
  if (typeof valor !== 'string') {
    return null;
  }

  const codigo = valor.trim();

  if (!/^\d{6}$/.test(codigo)) {
    return null;
  }

  return codigo;
}

async function solicitarVerificacion(req, res) {
  try {
    const correo = normalizarCorreo(req.body?.correo);

    if (!correo) {
      return res.status(400).json({
        error: 'Correo inválido.',
      });
    }

    const usuario = await Usuario.findOne({
      correo,
      correoVerificado: false,
      estadoCuenta: 'habilitada',
    });

    // Diagnóstico temporal: no imprime datos personales ni secretos.
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        '[verificacion] usuario elegible:',
        Boolean(usuario),
      );
    }

    if (!usuario) {
      return res.status(200).json({
        mensaje: MENSAJE_SOLICITUD,
      });
    }

    const emision = await emitirCodigo(correo);

    await enviarCodigoVerificacion({
      destinatario: correo,
      codigo: emision.codigo,
      minutosVigencia: 10,
    });

    return res.status(200).json({
      mensaje: MENSAJE_SOLICITUD,
    });
  } catch (error) {
    if (error?.codigo === 'REENVIO_NO_PERMITIDO') {
      return res.status(429).json({
        error: 'Debes esperar antes de solicitar un nuevo código.',
      });
    }

    if (error?.codigo === 'SESION_MICROSOFT_AUSENTE') {
      return res.status(503).json({
        error: 'El servicio de correo no está disponible temporalmente.',
      });
    }

    return res.status(500).json({
      error: 'No fue posible procesar la solicitud.',
    });
  }
}

async function confirmarVerificacion(req, res) {
  try {
    const correo = normalizarCorreo(req.body?.correo);
    const codigo = normalizarCodigo(req.body?.codigo);

    if (!correo || !codigo) {
      return res.status(400).json({
        error: 'Correo o código inválido.',
      });
    }

    const resultado = await verificarCodigo({
      correo,
      codigo,
    });

    if (!resultado.verificado) {
      return res.status(400).json({
        error: 'Código inválido o expirado.',
      });
    }

    return res.status(200).json({
      mensaje: MENSAJE_CONFIRMACION,
    });
  } catch (error) {
    if (error?.codigo === 'INTENTOS_AGOTADOS') {
      return res.status(429).json({
        error: 'Has superado el número de intentos. Solicita un nuevo código.',
      });
    }

    if (error?.codigo === 'CODIGO_EXPIRADO') {
      return res.status(400).json({
        error: 'El código ha expirado. Solicita uno nuevo.',
      });
    }

    return res.status(500).json({
      error: 'No fue posible verificar el código.',
    });
  }
}

module.exports = {
  solicitarVerificacion,
  confirmarVerificacion,
};
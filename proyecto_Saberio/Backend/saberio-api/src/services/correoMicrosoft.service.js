const { obtenerClienteMicrosoft, MICROSOFT_SCOPES } = require('../../config/microsoft');
const { obtenerSesion } = require('./microsoftSesion.service');

const GRAPH_SEND_MAIL_URL = 'https://graph.microsoft.com/v1.0/me/sendMail';
const TIMEOUT_MS = 30000;

function crearError(mensaje, codigo) {
  const error = new Error(mensaje);
  error.codigo = codigo;
  return error;
}

function normalizarDestinatario(correo) {
  if (typeof correo !== 'string') {
    throw crearError('Destinatario inválido.', 'DESTINATARIO_INVALIDO');
  }

  const destinatario = correo.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destinatario)) {
    throw crearError('Destinatario inválido.', 'DESTINATARIO_INVALIDO');
  }

  return destinatario;
}

function construirMensaje({ destinatario, asunto, texto }) {
  if (typeof asunto !== 'string' || asunto.trim().length === 0) {
    throw crearError('Asunto inválido.', 'ASUNTO_INVALIDO');
  }

  if (typeof texto !== 'string' || texto.trim().length === 0) {
    throw crearError('Contenido del correo inválido.', 'CONTENIDO_INVALIDO');
  }

  return {
    message: {
      subject: asunto.trim(),
      body: {
        contentType: 'Text',
        content: texto.trim(),
      },
      toRecipients: [
        {
          emailAddress: {
            address: destinatario,
          },
        },
      ],
    },
    saveToSentItems: true,
  };
}

async function enviarCorreo({ destinatario, asunto, texto }) {
  const correoDestinatario = normalizarDestinatario(destinatario);
  const mensaje = construirMensaje({ destinatario: correoDestinatario, asunto, texto });

  const cliente = obtenerClienteMicrosoft();

  let token;

  try {
    const resultado = await cliente.acquireTokenSilent({
      scopes: MICROSOFT_SCOPES,
      account: undefined,
    });

    token = resultado?.accessToken;
  } catch {
    token = undefined;
  }

  if (!token) {
    throw crearError(
      'No hay una sesión autorizada de Microsoft disponible.',
      'SESION_MICROSOFT_AUSENTE',
    );
  }

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  try {
    const respuesta = await fetch(GRAPH_SEND_MAIL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mensaje),
      signal: controlador.signal,
    });

    if (respuesta.status !== 202) {
      throw crearError(
        'Microsoft rechazó la solicitud de envío.',
        'ENVIO_RECHAZADO',
      );
    }

    return {
      aceptado: true,
      destinatario: correoDestinatario,
    };
  } catch (error) {
    if (error?.codigo) {
      throw error;
    }

    if (error?.name === 'AbortError') {
      throw crearError(
        'Microsoft tardó demasiado en responder.',
        'TIEMPO_AGOTADO',
      );
    }

    throw crearError(
      'No fue posible enviar el correo.',
      'ERROR_ENVIO_CORREO',
    );
  } finally {
    clearTimeout(temporizador);
  }
}

async function enviarCodigoVerificacion({ destinatario, codigo, minutosVigencia }) {
  const minutos = Number.parseInt(minutosVigencia, 10);

  if (!Number.isInteger(minutos) || minutos <= 0) {
    throw crearError(
      'Vigencia del código inválida.',
      'VIGENCIA_INVALIDA',
    );
  }

  return enviarCorreo({
    destinatario,
    asunto: 'Saberio: código de verificación',
    texto: [
      'Hola,',
      '',
      `Tu código de verificación para Saberio es: ${codigo}`,
      '',
      `Este código vence en ${minutos} minutos.`,
      'Si no solicitaste este código, ignora este mensaje.',
      '',
      'Equipo Saberio',
    ].join('\n'),
  });
}

module.exports = {
  enviarCorreo,
  enviarCodigoVerificacion,
};
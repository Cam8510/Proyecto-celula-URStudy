const {
  ConfidentialClientApplication,
} = require('@azure/msal-node');

let clienteMicrosoft;

function obtenerConfiguracionMicrosoft() {
  const clientId = process.env.MICROSOFT_CLIENT_ID?.trim();
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
  const redirectUri =
    process.env.MICROSOFT_REDIRECT_URI?.trim();
  const remitente =
    process.env.MICROSOFT_SENDER_EMAIL?.trim().toLowerCase();

  if (!clientId || !clientSecret || !redirectUri || !remitente) {
    throw new Error(
      'Faltan variables de configuración de Microsoft en .env'
    );
  }

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      clientId
    )
  ) {
    throw new Error(
      'MICROSOFT_CLIENT_ID no tiene el formato esperado'
    );
  }

  const callbackEsperado =
    'http://localhost:3000/api/correo/microsoft/callback';

  if (redirectUri !== callbackEsperado) {
    throw new Error(
      'Para esta etapa local, MICROSOFT_REDIRECT_URI debe coincidir con el callback configurado'
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(remitente)) {
    throw new Error(
      'MICROSOFT_SENDER_EMAIL no tiene un formato válido'
    );
  }

  return {
    clientId,
    clientSecret,
    redirectUri,
    remitente,
  };
}

function obtenerClienteMicrosoft() {
  if (!clienteMicrosoft) {
    const configuracion = obtenerConfiguracionMicrosoft();

    clienteMicrosoft = new ConfidentialClientApplication({
      auth: {
        clientId: configuracion.clientId,
        clientSecret: configuracion.clientSecret,

        // La cuenta remitente será una cuenta personal Microsoft.
        authority:
          'https://login.microsoftonline.com/consumers',
      },
    });
  }

  return clienteMicrosoft;
}

const MICROSOFT_SCOPES = Object.freeze([
  'https://graph.microsoft.com/Mail.Send',
]);

module.exports = {
  obtenerConfiguracionMicrosoft,
  obtenerClienteMicrosoft,
  MICROSOFT_SCOPES,
};
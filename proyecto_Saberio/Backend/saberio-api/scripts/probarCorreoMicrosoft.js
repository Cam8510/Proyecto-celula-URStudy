const path = require('node:path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env'),
  quiet: true,
});

const http = require('node:http');
const { randomBytes, timingSafeEqual } = require('node:crypto');
const { CryptoProvider } = require('@azure/msal-node');

const {
  obtenerConfiguracionMicrosoft,
  obtenerClienteMicrosoft,
  MICROSOFT_SCOPES,
} = require('../config/microsoft');

async function iniciarPrueba() {
  const configuracion = obtenerConfiguracionMicrosoft();
  const cliente = obtenerClienteMicrosoft();

  const cryptoProvider = new CryptoProvider();

  const { verifier, challenge } =
    await cryptoProvider.generatePkceCodes();

  const state = randomBytes(32).toString('hex');
  const venceEn = Date.now() + 5 * 60 * 1000;

  let utilizado = false;

  const urlAutorizacion = await cliente.getAuthCodeUrl({
    scopes: [...MICROSOFT_SCOPES],
    redirectUri: configuracion.redirectUri,
    responseMode: 'query',
    state,
    codeChallenge: challenge,
    codeChallengeMethod: 'S256',
    prompt: 'select_account',
    loginHint: configuracion.remitente,
  });

  const servidor = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer');

    try {
      const url = new URL(req.url, 'http://localhost:3000');

      if (
        req.method !== 'GET' ||
        url.pathname !== '/api/correo/microsoft/callback'
      ) {
        res.writeHead(404);
        res.end('Ruta no disponible en esta prueba.');
        return;
      }

      const stateRecibido = url.searchParams.get('state');

      const stateValido =
        typeof stateRecibido === 'string' &&
        /^[a-f0-9]{64}$/.test(stateRecibido) &&
        timingSafeEqual(
          Buffer.from(stateRecibido, 'hex'),
          Buffer.from(state, 'hex')
        );

      if (!stateValido || utilizado || Date.now() >= venceEn) {
        res.writeHead(400);
        res.end('Solicitud inválida o vencida. Reinicia la prueba.');
        return;
      }

      utilizado = true;

      if (url.searchParams.has('error')) {
        res.writeHead(400);
        res.end('Microsoft no autorizó la operación.');
        console.error('La autorización fue rechazada o cancelada.');
        cerrar();
        return;
      }

      const code = url.searchParams.get('code');

      if (!code) {
        throw new Error('CODIGO_AUTORIZACION_AUSENTE');
      }

      const resultado = await cliente.acquireTokenByCode({
        code,
        codeVerifier: verifier,
        scopes: [...MICROSOFT_SCOPES],
        redirectUri: configuracion.redirectUri,
      });

      const cuentaAutorizada =
        resultado?.account?.username?.trim().toLowerCase();

      if (cuentaAutorizada !== configuracion.remitente) {
        throw new Error('CUENTA_REMITENTE_DISTINTA');
      }

      if (!resultado.accessToken) {
        throw new Error('TOKEN_AUSENTE');
      }

      const respuesta = await fetch(
        'https://graph.microsoft.com/v1.0/me/sendMail',
        {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${resultado.accessToken}`,
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            message: {
              subject: 'Prueba de correo Saberio',

              body: {
                contentType: 'Text',
                content: 'Hola, este es un mensaje de prueba de Saberio.'
              },

              toRecipients: [
                {
                  emailAddress: {
                    address: 'ma-valeriano@javeriana.edu.co',
                  },
                },
              ],
            },

            saveToSentItems: true,
          }),

          signal: AbortSignal.timeout(30000),
        }
      );

      if (respuesta.status !== 202) {
        console.error(
          'Microsoft Graph rechazó el envío. Estado HTTP:',
          respuesta.status
        );

        throw new Error('ENVIO_RECHAZADO');
      }

      console.log('Cuenta remitente autorizada.');
      console.log('Microsoft aceptó la solicitud de envío.');
      console.log('Revisa tu correo universitario y la carpeta de spam.');

      res.writeHead(200);
      res.end(
        'Microsoft aceptó el mensaje de prueba. ' +
        'Puedes cerrar esta pestaña y revisar tu correo universitario.'
      );

      cerrar();
    } catch (error) {
      const codigo = error.errorCode || error.code || error.message;

      console.error(
        'La prueba no se completó. Código:',
        String(codigo).slice(0, 150)
      );

      if (!res.headersSent) {
        res.writeHead(500);
      }

      res.end(
        'No se completó la prueba. Revisa el código de error en la terminal.'
      );

      cerrar();
    }
  });

  const temporizador = setTimeout(() => {
    console.error('La prueba venció. Puedes ejecutarla de nuevo.');
    servidor.close();
  }, 5 * 60 * 1000);

  function cerrar() {
    clearTimeout(temporizador);
    servidor.close();
  }

  servidor.on('error', (error) => {
    clearTimeout(temporizador);

    console.error(
      'No se pudo abrir el servidor local:',
      error.code
    );

    process.exitCode = 1;
  });

  servidor.listen(3000, 'localhost', () => {
    console.log('Abre este enlace en el navegador de este computador:');
    console.log(urlAutorizacion);
    console.log('Autoriza únicamente la cuenta Outlook remitente.');
    console.log('El enlace vence en cinco minutos. No lo compartas.');
  });
}

iniciarPrueba().catch((error) => {
  console.error(
    'No se pudo preparar la prueba:',
    error.errorCode || error.code || error.message
  );

  process.exitCode = 1;
});
const path = require('node:path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env'),
  quiet: true,
});

const {
  obtenerConfiguracionMicrosoft,
  obtenerClienteMicrosoft,
} = require('../config/microsoft');

try {
  obtenerConfiguracionMicrosoft();

  const cliente = obtenerClienteMicrosoft();

  if (typeof cliente.getAuthCodeUrl !== 'function') {
    throw new Error('No se pudo preparar el cliente de Microsoft');
  }

  console.log(
    'Correcto: variables locales y cliente MSAL preparados'
  );
  console.log(
    'Pendiente: autorización de la cuenta y prueba real de envío'
  );
} catch (error) {
  console.error('Configuración incompleta:', error.message);
  process.exitCode = 1;
}
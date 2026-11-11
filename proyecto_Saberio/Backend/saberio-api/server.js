const path = require('node:path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
  quiet: true,
});

const app = require('./app');
const { conectarBaseDeDatos } = require('./config/db');

const PORT = Number(process.env.PORT);
const MONGO_URI = process.env.MONGO_URI?.trim();

async function iniciarServidor() {
  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    console.error(
      'Configura PORT en .env con un número entero entre 1 y 65535'
    );
    process.exit(1);
  }

  if (!MONGO_URI) {
    console.error('Falta configurar MONGO_URI en el archivo .env');
    process.exit(1);
  }

  try {
    await conectarBaseDeDatos(MONGO_URI);

    const servidor = app.listen(PORT, () => {
      console.log(`Saberio API: http://localhost:${PORT}`);
      console.log(
        `Prueba de salud: http://localhost:${PORT}/api/saberio`
      );
    });

    servidor.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está ocupado`);
      } else {
        console.error(
          'No se pudo iniciar el servidor:',
          error.code
        );
      }

      process.exit(1);
    });
  } catch (error) {
    // No mostramos la URI ni el objeto completo del error.
    console.error('No se pudo conectar a MongoDB Atlas.');
    console.error('Tipo de error:', error.name);
    console.error(
      'Revisa las credenciales, la IP autorizada y la conexión de red.'
    );

    process.exit(1);
  }
}

iniciarServidor();
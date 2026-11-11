const express = require('express');

const authRouter = require('./src/routes/auth.routes');
const rutasVerificacionCorreo = require('./src/routes/verificacionCorreo.routes');

const {
  rutaNoEncontrada,
  manejarErrores,
} = require('./src/middlewares/manejarErrores');

const app = express();

app.disable('x-powered-by');

app.use(express.json({ limit: '100kb' }));

app.get('/api/salud', (req, res) => {
  res.status(200).json({
    estado: 'ok',
    servicio: 'Saberio API',
  });
});

// Registro de cuentas.
app.use('/api/auth', authRouter);
app.use('/api/verificacion', rutasVerificacionCorreo);

// Siempre después de las rutas.
app.use(rutaNoEncontrada);
app.use(manejarErrores);

module.exports = app;
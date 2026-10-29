//encender servidor
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`API tareas en http://localhost:${PORT}/api/tareas`);
});

module.exports = server;

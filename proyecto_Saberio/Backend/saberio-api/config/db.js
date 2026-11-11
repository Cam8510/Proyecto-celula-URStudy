const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

async function conectarBaseDeDatos(uri) {
  await mongoose.connect(uri, {
    dbName: 'saberio',
    serverSelectionTimeoutMS: 10000,
  });

  console.log(
    `Conectado a MongoDB Atlas: base "${mongoose.connection.name}"`
  );
}

module.exports = { conectarBaseDeDatos };
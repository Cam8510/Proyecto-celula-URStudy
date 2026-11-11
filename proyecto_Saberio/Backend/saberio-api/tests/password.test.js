const assert = require('node:assert/strict');
const bcrypt = require('bcrypt');

const HttpError = require('../src/utils/HttpError');

const {
  generarPasswordHash,
  comprobarPassword,
} = require('../src/services/password.service');

async function ejecutarPruebas() {
  // Contraseña ficticia utilizada únicamente en esta prueba.
  const password = 'PruebaSegura123';

  const hash = await generarPasswordHash(password);

  // No se almacena la contraseña original.
  assert.equal(typeof hash, 'string');
  assert.notEqual(hash, password);

  // Se utiliza el coste configurado.
  assert.equal(bcrypt.getRounds(hash), 12);

  // Una contraseña correcta coincide.
  assert.equal(
    await comprobarPassword(password, hash),
    true
  );

  // Una contraseña diferente no coincide.
  assert.equal(
    await comprobarPassword('OtraPassword123', hash),
    false
  );

  // No se eliminan espacios de la contraseña.
  assert.equal(
    await comprobarPassword(` ${password} `, hash),
    false
  );

  // La sal permite obtener hashes diferentes.
  const otroHash = await generarPasswordHash(password);

  assert.notEqual(hash, otroHash);

  assert.equal(
    await comprobarPassword(password, otroHash),
    true
  );

  // Se rechazan entradas demasiado largas antes del hash.
  const passwordLargo = 'A1' + 'ñ'.repeat(36);

  await assert.rejects(
    () => generarPasswordHash(passwordLargo),
    (error) =>
      error instanceof HttpError &&
      error.codigo === 'PASSWORD_INVALIDO'
  );

  // Tampoco se permite comparar truncando entradas largas.
  assert.equal(
    await comprobarPassword(passwordLargo, hash),
    false
  );

  // Las entradas inválidas no autentican al usuario.
  assert.equal(await comprobarPassword(null, hash), false);
  assert.equal(await comprobarPassword('', hash), false);
  assert.equal(await comprobarPassword(password, null), false);

  console.log(
    'Correcto: hash, comparación y límites de contraseña comprobados'
  );
}

ejecutarPruebas().catch((error) => {
  console.error('Falló la prueba:', error.message);
  process.exitCode = 1;
});
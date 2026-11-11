const assert = require('node:assert/strict');

const {
  validarCorreoInstitucional,
} = require('../src/utils/validarCorreoInstitucional');

const casos = [
  {
    entrada: 'persona@urosario.edu.co',
    esperado: true,
  },
  {
    entrada: 'persona@unal.edu.co',
    esperado: true,
  },
  {
    entrada: 'persona@est.uexternado.edu.co',
    esperado: true,
  },
  {
    entrada: '  PERSONA@UNIANDES.EDU.CO  ',
    esperado: true,
    correoEsperado: 'persona@uniandes.edu.co',
  },
  {
    entrada: 'persona@gmail.com',
    esperado: false,
  },
  {
    entrada: 'persona@unal.edu.co.ejemplo.com',
    esperado: false,
  },
  {
    entrada: 'persona@subdominio.unal.edu.co',
    esperado: false,
  },
  {
    entrada: 'persona@@unal.edu.co',
    esperado: false,
  },
  {
    entrada: '.persona@unal.edu.co',
    esperado: false,
  },
  {
    entrada: 'persona..apellido@unal.edu.co',
    esperado: false,
  },
  {
    entrada: '',
    esperado: false,
  },
  {
    entrada: null,
    esperado: false,
  },
];

for (const caso of casos) {
  const resultado = validarCorreoInstitucional(caso.entrada);

  assert.equal(
    resultado.valido,
    caso.esperado,
    `Resultado incorrecto para: ${JSON.stringify(caso.entrada)}`
  );

  if (caso.correoEsperado) {
    assert.equal(resultado.correo, caso.correoEsperado);
  }
}

console.log(
  `Correcto: ${casos.length} pruebas de correo superadas`
);
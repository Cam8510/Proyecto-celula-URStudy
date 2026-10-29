//Capa de servicios para manejar la lógicca de negocio
// relacionada con las tareas

const HttpError = require("../utils/HttpError");

//base de datos local
let tareas = [
  { id: 1, titulo: "Realizar avances de Proyecto desarrollo web", completada: false },
  { id: 2, titulo: "Estudiar para abstracta", completada: false },
  { id: 3, titulo: "Estudiar para el parcial de desarrollo web", completada: true },
];

let siguieteId = 4;

function listar() {
  return tareas;
}

function obtener(id) {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) {
    throw new HttpError(404, `No existe la tarea con id: ${id}`);
  }
  return tarea;
}

function crear(titulo) {
  const nueva = {
    id: siguieteId++,
    titulo,
    completada: false
  };
  tareas.push(nueva);
  return nueva;
}

function actualizar(id, cambios) {
  const tarea = obtener(id);
  Object.assign(tarea, cambios);
  return tarea;
}

function eliminar(id) {
  obtener(id);
  tareas = tareas.filter(t => t.id !== id);
}

module.exports = { listar, obtener, crear, actualizar, eliminar };

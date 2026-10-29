// capa de controladores: traductor HTTP <-> lógica de negocio y genera una respuesta HTTP
const Service = require("../services/tareas.service");

function listar(req, res) {
  res.status(200).json(Service.listar());
}

function obtener(req, res) {
  const id = Number(req.params.id);
  res.status(200).json(Service.obtener(id));
}

function crear(req, res) {
  const nueva = Service.crear(req.body.titulo);
  res.status(201).json(nueva);
}

function actualizar(req, res) {
  const id = Number(req.params.id);
  res.status(200).json(Service.actualizar(id, req.body));
}

function eliminar(req, res) {
  Service.eliminar(Number(req.params.id));
  res.status(204).send();
}

module.exports = { listar, obtener, crear, actualizar, eliminar };

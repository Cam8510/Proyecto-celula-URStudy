// Capita de rutas: metodo + url-> controlador
const {Router} = require("express");   //es una instancia y por eso va en {}
const controlador = require("../controllers/tareas.controller");
const router = Router();

router.get("/", controlador.listar);
router.get("/:id", controlador.obtener);
router.post("/", controlador.crear);
router.patch("/:id", controlador.actualizar);
router.delete("/:id", controlador.eliminar);

module.exports = router;
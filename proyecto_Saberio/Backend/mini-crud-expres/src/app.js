// Configurar express app.use le de un orden para cada peticion
const express = require('express');
const tareasRouter = require("./routes/tareas.routes");

const app = express();
//1.convertir el cuerpo json de la apeticion req.body
app.use(express.json());
//2.Rutas
app.get("/api/salud", (req, res) => {
  res.json({ estado: "ok" });
});
app.use("/api/tareas", tareasRouter);


module.exports = app;
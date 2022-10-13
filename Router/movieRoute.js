const express = require("express");
const router = express.Router();
const { getMovies, createMovie, getOneMovie, deleteMovie, updateMovie } = require("../controllers/movies");
const mkMulter = require("../middlewares/mkMulter");

//requerimos de todas las funcionalidades que creamos para las rutas de PELICULAS y configuramos:


/* Movies */
router.get("/",getMovies);
router.post("/",mkMulter.single("imagen"),createMovie);
router.put("/:id",mkMulter.single("imagen"),updateMovie);
router.delete("/:id",deleteMovie);
router.get("/:id",getOneMovie);

module.exports = router;
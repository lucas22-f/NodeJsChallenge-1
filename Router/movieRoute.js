const express = require("express");
const router = express.Router();
const { getMovies, createMovie, getOneMovie, deleteMovie, updateMovie } = require("../controllers/movies");

/* Movies */
router.get("/",getMovies);
router.post("/",createMovie);
router.put("/:id",updateMovie);
router.delete("/:id",deleteMovie);
router.get("/:id",getOneMovie);

module.exports = router;
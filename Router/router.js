const express = require("express");
const { getCharacters,createCharacter, getOneCharacter, deleteCharacter, updateCharacter } = require("../controllers/characters");
const { getMovies, createMovie, getOneMovie, deleteMovie, updateMovie } = require("../controllers/movies");

const router = express.Router();

/* Login */
router.post("/auth/login");
router.post("/auth/register");

/* Characters */
router.get("/characters",getCharacters);
router.post("/characters",createCharacter);
router.put("/characters/:id",updateCharacter);
router.delete("/characters/:id",deleteCharacter);
router.get("/characters/:id",getOneCharacter);

/* Movies */
router.get("/movies",getMovies);
router.post("/movies",createMovie);
router.put("/movies/:id",updateMovie);
router.delete("/movies/:id",deleteMovie);
router.get("/movies/:id",getOneMovie);




module.exports = router;

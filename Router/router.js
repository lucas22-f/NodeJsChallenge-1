const express = require("express");
const { getCharacters,createCharacter, getOneCharacter } = require("../controllers/characters");
const { getMovies, createMovie } = require("../controllers/movies");

const router = express.Router();

/* Login */
router.post("/auth/login");
router.post("/auth/register");

/* Characters */
router.get("/characters",getCharacters);
router.post("/characters",createCharacter);
router.put("/characters/:id");
router.delete("/characters/:id");
router.get("/characters/:id",getOneCharacter);

/* Movies */
router.get("/movies",getMovies);
router.post("/movies",createMovie);
router.put("/movies/:id");
router.delete("/movies/:id");
router.get("/movies/:id");
module.exports = router;

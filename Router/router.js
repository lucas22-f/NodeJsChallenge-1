const express = require("express");
const router = express.Router();

//archivo enrutador principal donde manejamos la base de todas nuestras rutas ! 

const charactersRoute = require("./characterRoute")
const moviesRoute = require("./movieRoute")
const genderRoute = require("./genderRoute");
router.use("/characters", charactersRoute);
router.use("/movies", moviesRoute);
router.use("/genders",genderRoute);
module.exports = router;

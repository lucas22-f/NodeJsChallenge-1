const express = require("express");
const router = express.Router();

const charactersRoute = require("./characterRoute")
const moviesRoute = require("./movieRoute")
const genderRoute = require("./genderRoute");
router.use("/characters", charactersRoute);
router.use("/movies", moviesRoute);
router.use("/genders",genderRoute);
module.exports = router;

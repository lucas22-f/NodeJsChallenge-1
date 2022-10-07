const express = require("express");
const router = express.Router();

const charactersRoute = require("./characterRoute")
const moviesRoute = require("./movieRoute")

router.use("/characters", charactersRoute);
router.use("/movies", moviesRoute);

module.exports = router;

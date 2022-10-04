const express = require("express");



const router = express.Router();



router.use("/characters",require("./characterRoute"));
router.use("/movies",require("./movieRoute"));





module.exports = router;

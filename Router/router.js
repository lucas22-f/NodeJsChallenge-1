const express = require("express");

const router = express.Router();

/* Login */
router.post("/auth/login");
router.post("/auth/register");

/* Characters */
router.get("/characters");
router.post("/characters");
router.put("/characters/:id");
router.delete("/characters/:id");
router.get("/characters/:id");

/* Movies */
router.get("/movies");
router.post("/movies");
router.put("/movies/:id");
router.delete("/movies/:id");
router.get("/movies/:id");
module.exports = router;

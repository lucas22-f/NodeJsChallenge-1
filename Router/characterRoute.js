const express = require("express");
const router = express.Router();
const { getCharacters,createCharacter, getOneCharacter, deleteCharacter, updateCharacter } = require("../controllers/characters");

/* Characters */
router.get("/",getCharacters);
router.post("/",createCharacter);
router.put("/:id",updateCharacter);
router.delete("/:id",deleteCharacter);
router.get("/:id",getOneCharacter);

module.exports = router;
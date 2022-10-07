const express = require("express");
const router = express.Router();
const { getCharacters,createCharacter, getOneCharacter, deleteCharacter, updateCharacter } = require("../controllers/characters");
const mkMulter = require("../middlewares/mkMulter");

/* Characters */
router.get("/",getCharacters);
router.post("/",mkMulter.single("imagen"),createCharacter);
router.put("/:id",mkMulter.single("imagen"),updateCharacter);
router.delete("/:id",deleteCharacter);
router.get("/:id",getOneCharacter);

module.exports = router;
const express = require("express");
const router = express.Router();
const { getCharacters,createCharacter, getOneCharacter, deleteCharacter, updateCharacter } = require("../controllers/characters");
const mkMulter = require("../middlewares/mkMulter");


//requerimos de todas las funcionalidades que creamos para las rutas de PERSONAJES y configuramos:


/* Characters */
router.get("/",getCharacters);
router.post("/",mkMulter.single("imagen"),createCharacter);//aplicamos middlewares correspondientes para manejo de archivos con multer
router.put("/:id",mkMulter.single("imagen"),updateCharacter);//aplicamos middlewares correspondientes para manejo de archivos con multer
router.delete("/:id",deleteCharacter);
router.get("/:id",getOneCharacter);

module.exports = router;
const express = require("express");
const router = express.Router();
const {getGenders,createGender,updateGender,deleteGender} = require("../controllers/gender");
const mkMulter = require("../middlewares/mkMulter");

//requerimos de todas las funcionalidades que creamos para las rutas de GENEROS y configuramos:

/* Genders */
router.get("/",getGenders);
router.post("/",mkMulter.single("imagen"),createGender);
router.put("/:id",mkMulter.single("imagen"),updateGender);
router.delete("/:id",deleteGender);


module.exports = router;
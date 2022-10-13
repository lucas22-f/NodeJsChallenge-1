const express = require("express");
const router = express.Router();
const {getGenders,createGender,updateGender,deleteGender} = require("../controllers/gender");

/* Characters */
router.get("/",getGenders);
router.post("/",createGender);
router.put("/:id",updateGender);
router.delete("/:id",deleteGender);


module.exports = router;

const express = require("express");
const router = express.Router();
const {loginUser,registerUser} = require("../controllers/users");
const validate = require("../middlewares/validate");
const {UserSchema} = require("../validators/userValidator");

//rutas de authorization para hacer login y register de nuestros usuarios! con sus respectivos validadores creados con JOI 


/* Login - Register */
router.post("/login",validate(UserSchema), loginUser);
router.post("/register",validate(UserSchema) , registerUser );



module.exports = router;

const express = require("express");
const router = express.Router();
const {loginUser,registerUser} = require("../controllers/users");
const validate = require("../middlewares/validate");
const {UserSchema} = require("../validators/userValidator");

/* Login - Register */
router.post("/login",validate(UserSchema), loginUser);
router.post("/register",validate(UserSchema) , registerUser );



module.exports = router;
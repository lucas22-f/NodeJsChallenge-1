

const Joi = require("joi");


const UserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})




module.exports = {UserSchema};
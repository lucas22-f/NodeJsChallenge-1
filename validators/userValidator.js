

const Joi = require("joi");

//ESQUEMA DE VALIDACIONES PARA USUARIOS CREADO CON JOI 


const UserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})




module.exports = {UserSchema};
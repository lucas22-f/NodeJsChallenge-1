const jwt = require("jsonwebtoken");
const User = require("../models/User");

//creamos middleware para decodificar el Token JWT que se le da al usuario al momento de authenticarse. 
require("dotenv").config;

const decode = async (req,res,next) =>{

    if(req.header('Authorization')&& req.header("Authorization").split(' ').length > 1){

        try {

            let datajwt = jwt.verify(req.header("Authorization").split(' ').pop(),process.env.jwtkey); // checkeamos que el header authorization contenga los datos validos.
            res.locals.token = datajwt
            let user = await User.findOne({where:{id:datajwt.id}})
            if(!user)throw new Error("Usuario no autorizado.")
            res.locals.user = user
        
            return next()

        } catch (error) {
           return next(error);
        }



    }else{
        let err = new Error("no JWT token")
        return next(err);
    }
    
}

module.exports = {decode};
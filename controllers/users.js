const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sengridMail");



require("dotenv").config;
const getUsers = async (req, res, next) => {// funcion get para mostrar lista de Usuarios.
  try {
    const data = await User.findAll();
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const getOneUser = async (req, res, next) => {//funcion get para mostrar 1 Usuario
  try {
    const id = req.params.id;
    const data = await User.findOne({
      where: {
        id: id,
      },
    });
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {//funcion post para registrar 1 Usuario
  try {
    if (await User.findOne({ where: { email: req.body.email } })) throw new Error("email ya registrado")
    
    const password = await bcrypt.hashSync(req.body.password, 10) // hasheamos contraseña para la base de datos. 
    const data = { ...req.body, password }; 
    const user = await User.create(data);
    let emailSend = await sendMail(user)  
    /* creamos funcion sendMail para tener mas limpio 
    la funcion register y a su vez implementar el servicio de mails */
    res.json({
      message: "User Registered",
      id: user.id,
      emailSend: emailSend,
      token: jwt.sign({ id: user.id }, process.env.jwtkey, { expiresIn: "1h" })//cuando hacemos register obtenemos el token JWT.

    });

  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {//funcion post para login de 1 Usuario
  try {
    let user = await User.findOne({//verificamos que el mail exista
      where: {
        email: req.body.email
      }
    })
    if (user && await bcrypt.compareSync(req.body.password, user.password)) {// aca verificamos si los datos son validos.

      res.status(200).
        json(
          {
            message: "User Loged",
            id: user.id,
            token: jwt.sign({ id: user.id }, process.env.jwtkey, { expiresIn: "1h" })//logueamos con el token JWT
          }

        )

    } else {
      let err = new Error("credenciales invalidas")
      err.status = 401;
      next(err)
    }

  } catch (error) {
    next(error)
  }
}


module.exports = { getUsers, registerUser, getOneUser, loginUser };

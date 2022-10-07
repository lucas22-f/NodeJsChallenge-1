const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const getUsers = async (req, res ,next) => {
  try {
    const data = await User.findAll();
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const getOneUser = async (req, res , next) => {
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

const registerUser = async (req, res, next) => {
  try {
    if(await User.findOne({where:{email:req.body.email}})) throw new Error("email ya registrado")
    const password = await bcrypt.hashSync(req.body.password, 10)
    const data = { ...req.body, password };
    const user = await User.create(data);
    res.json({
      message:"User Registered",
      id:user.id,
      token:jwt.sign({id:user.id},process.env.jwtkey, { expiresIn: "1h" })

    }); 


  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (user && await bcrypt.compareSync(req.body.password, user.password)) {

      res.status(200).
      json(
        { 
          message: "User Loged",
          id: user.id,
          token:jwt.sign({id:user.id}, process.env.jwtkey, { expiresIn: "1h" })
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

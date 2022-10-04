const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const getOneUser = async (req, res) => {
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
    const password = await bcrypt.hashSync(req.body.password, 10)
    const data = { ...req.body, password };
    const user = await User.create(data);
    res.json(user);


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

      res.status(200).json({ message: "User Loged" })

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

const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("disneydb","root","elfigue",  {
host:"localhost",
dialect: "mysql",
})

module.exports = sequelize;




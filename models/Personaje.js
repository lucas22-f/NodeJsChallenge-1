'use strict'
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Movie_Character = require("./Movie_Character");



let Personaje = sequelize.define("personaje", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imagen: {
    type: DataTypes.STRING,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  edad: {
    type: DataTypes.INTEGER,
  },
  peso: {
    type: DataTypes.INTEGER,
  },
  historia: {
    type: DataTypes.STRING,
  }
})
Personaje.hasMany(Movie_Character);
Movie_Character.belongsTo(Personaje);



module.exports = Personaje;



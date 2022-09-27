'use strict'
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Genero = require("./genero");
const Pelicula = require("./pelicula");
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
Pelicula.hasMany(Movie_Character);
Movie_Character.belongsTo(Personaje);
Movie_Character.belongsTo(Pelicula);


module.exports = Personaje;



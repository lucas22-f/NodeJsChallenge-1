'use strict'
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Genero = require("./genero");
const Pelicula = require("./pelicula");




let Personaje = sequelize.define("Personaje", {

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
Pelicula.hasMany(Personaje, {
  foreignKey: "PeliculaId",
  sourceKey: "id"
})
Personaje.belongsTo(Pelicula, {
  foreignKey: "PeliculaId",
  targetKey: "id"

})

Personaje.hasMany(Pelicula, {
  foreignKey: "PersonajeId",
  sourceKey: "id"
})
Pelicula.belongsTo(Personaje, {
  foreignKey: "PersonajeId",
  targetKey: "id"

})

Pelicula.hasMany(Genero, {
  foreignKey: "PeliculaId",
  targetKey: "id"
})
Genero.belongsTo(Pelicula, {
  foreignKey: "PeliculaId",
  targetKey: "id"
})





module.exports = Personaje;



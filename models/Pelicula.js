
//defino tabla Pelicula.
'use strict' 
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Genero = require("./Genero");
const Movie_Character = require("./Movie_Character");

//CREAMOS LOS MODELOS PARA LA BASE DE DATOS:

  let Pelicula = sequelize.define("pelicula",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    imagen:{
        type:DataTypes.STRING
    },
    titulo:{
        type:DataTypes.STRING
    },
    fechaCrea:{
        type:DataTypes.DATE
    },
    calificacion:{
        type:DataTypes.INTEGER
    }
})

Pelicula.hasMany(Movie_Character);
Movie_Character.belongsTo(Pelicula);
Genero.hasMany(Pelicula)
Pelicula.belongsTo(Genero);



module.exports = Pelicula;

//defino tabla Pelicula.
'use strict' 
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Genero = require("./Genero");
const Movie_Character = require("./Movie_Character");


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
Pelicula.hasMany(Genero)
Genero.belongsTo(Pelicula);



module.exports = Pelicula;
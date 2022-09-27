
//defino tabla Pelicula.
'use strict' 
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");



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




module.exports = Pelicula;
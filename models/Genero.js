

const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");
const Pelicula = require("./Pelicula");


const Genero = sequelize.define("generos",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    imagen:{
        type:DataTypes.STRING
    },
    nombre:{
        type:DataTypes.STRING
    },
  

},{
    timestamps:false,
})

Genero.hasMany(Pelicula)

module.exports = Genero;
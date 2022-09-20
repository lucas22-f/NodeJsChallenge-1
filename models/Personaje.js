const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");
const Pelicula = require("./Pelicula");


const Personaje = sequelize.define("personajes",{
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
    edad:{
        type:DataTypes.INTEGER
    },
    peso:{
        type:DataTypes.INTEGER
    },
    historia:{
        type:DataTypes.STRING
    },

},{
    timestamps:false,
})


Personaje.belongsToMany(Pelicula,{through:"pers_peli"});

module.exports = Personaje;
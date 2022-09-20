const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");
const Personaje = require("./Personaje");


//defino tabla Pelicula.
const Pelicula = sequelize.define("Pelicula",{
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
},{
    timestamps:false,
})
Pelicula.belongsToMany(Personaje,{through:"pers_peli"})
Personaje.belongsToMany(Pelicula,{through:"pers_peli"})
module.exports = Pelicula;


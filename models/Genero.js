

const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");
const Pelicula = require("./Pelicula");


const Genero = sequelize.define("Genero",{
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

Pelicula.hasMany(Genero,{
    foreignKey:"genPeliId",
    sourceKey:"id"
})
Genero.belongsTo(Pelicula,{
    foreignKey:"genPeliId",
    targetId:"id"
})

module.exports = Genero;
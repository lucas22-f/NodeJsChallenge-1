

const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");


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
  

})



module.exports = Genero;
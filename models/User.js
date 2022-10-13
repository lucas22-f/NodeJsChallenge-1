const sequelize =  require("../database/db");
const {DataTypes} = require("sequelize");

//CREAMOS LOS MODELOS PARA LA BASE DE DATOS:

const User = sequelize.define( "usuarios",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
},{
    timestamps:false
})

module.exports = User;

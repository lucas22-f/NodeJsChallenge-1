const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");


const Movie_Character = sequelize.define("movie_character",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

})



module.exports = Movie_Character;
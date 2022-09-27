const Movie_Character = require("../models/Movie_Character");
const Pelicula = require("../models/pelicula");
const Personaje = require("../models/personaje");

const getCharacters = async (req, res, next) => {
   const data = await Personaje.findAll();
   res.json(data);
}

const getOneCharacter = async(req,res,next) =>{
    const data = await Personaje.findOne({
        
        where:{
            id:req.params.id
        },
        include:[{
            model: Movie_Character,
            include: [{
                model: Pelicula
            }]
        }]
    
    
    })

    res.json(data);
}


const createCharacter = async (req, res, next) => {
    const data = { ...req.body };
    const character = await Personaje.create(data);
    const relacion = await Movie_Character.create({
        personajeId:character.id,
        peliculaId:req.body.peliculaId
    })
    res.json(character);

}



module.exports = { getCharacters, createCharacter, getOneCharacter}


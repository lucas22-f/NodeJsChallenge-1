const Movie_Character = require("../models/Movie_Character");
const Pelicula = require("../models/pelicula");
const Personaje = require("../models/personaje");

const getCharacters = async (req, res) => {
    try {
        const data = await Personaje.findAll();
        res.json(data);
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }

    
}

const getOneCharacter = async (req, res) => {

    try {
        const data = await Personaje.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Movie_Character,
                include: [{
                    model: Pelicula
                }]
            }]


        })
        res.json(data);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }


}


const createCharacter = async (req, res) => {

    try {
        const data = { ...req.body };
        const character = await Personaje.create(data);
        await Movie_Character.create({
            personajeId: character.id,
            peliculaId: req.body.peliculaId
        })
        res.json(character);

    } catch (error) {
        return res.status(500).json({message:error.message});
    }


}

const deleteCharacter = async(req,res)=>{
    try {
        const data = await Personaje.destroy({
            where:{
                id:req.params.id
            }
        })
        res.json(data);



    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const updateCharacter = async(req,res)=>{
    try {
        let newData = {...req.body}
        let data = await Personaje.findOne({
            where:{
                id:req.params.id
            }
        }) 
       
        await data.update(newData)
        await data.save(); 
        res.json(data); 
        

        
    } catch (error) {
       return res.status(500).json({message:error.message});
    }
}


module.exports = { getCharacters, createCharacter, getOneCharacter, deleteCharacter, updateCharacter }


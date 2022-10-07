const Movie_Character = require("../models/Movie_Character");
const Pelicula = require("../models/pelicula");
const Personaje = require("../models/personaje");

let publicUrl = "http://localhost:3000" // url que utilizaremos para guardar las imagenes 

const getCharacters = async (req, res, next) => {
  try {
    const data = await Personaje.findAll();
    if(!data.length)throw new Error("No hay Resultados / vacio")
    
    const miData = data.map((el)=>{
      let rta = {
        nombre:el.nombre,
        imagen:el.imagen
      }
      return rta;
    })
    
    res.json(miData);
  } catch (error) {
    return next(error);
  }
};

const getOneCharacter = async (req, res, next) => {
  try {
    const data = await Personaje.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Movie_Character,
          include: [
            {
              model: Pelicula,
            },
          ],
        },
      ],


    });
    if(!data)throw new Error("No hay Resultados / vacio")
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const createCharacter = async (req, res, next) => {
  try {
   console.log("llego a este lugar")
    const imagen = publicUrl+`/${req.file.filename}`;
    const data = { ...req.body,imagen};
    console.log(data);
    const character = await Personaje.create(data);
    await Movie_Character.create({
      personajeId: character.id,
      peliculaId: req.body.peliculaId,
    });
    
    res.json(character);
  } catch (error) {
    return next(error);
  }
};

const deleteCharacter = async (req, res, next) => {
  try {
    const data = await Personaje.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const updateCharacter = async (req, res, next) => {
  try {
    let newData = { ...req.body };
    let data = await Personaje.findOne({
      where: {
        id: req.params.id,
      },
    });

    await data.update(newData);
    await data.save();
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCharacters,
  createCharacter,
  getOneCharacter,
  deleteCharacter,
  updateCharacter,
};

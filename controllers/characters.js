const { charactQueryHandler } = require("../utils/queryParams");
const Movie_Character = require("../models/Movie_Character");
const Pelicula = require("../models/pelicula");
const Personaje = require("../models/personaje");

let publicUrl = "http://localhost:3000"; // url que utilizaremos para guardar las imagenes

const getCharacters = async (req, res, next) => { //funcion get para traer la lista de personajes
  try {
    let data = await Personaje.findAll();
    if (!data.length) throw new Error("No hay Resultados / vacio"); // validacion para saber si viene vacio o no 

    if (req.query) {
      let queryData = await charactQueryHandler(req, res, next);//funcion que creamos para manejar los parametros por query
      res.json(queryData);
    } else {
      const miData = data.map((el) => {//modificacion de la llegada de datos para mostrar lo que queremos
        let rta = {
          nombre: el.nombre,
          imagen: el.imagen,
        };
        return rta;
      });
      res.json(miData);
    }
  } catch (error) {
    return next(error);
  }
};

const getOneCharacter = async (req, res, next) => {//funcion get para traer 1  personaje
  try {
    const data = await Personaje.findOne({
      where: {
        id: req.params.id,
      },
      include: [//incluimos la relacion entre tablas con sequelize
        {
          model: Movie_Character, //para llegar hasta la tabla relacionada pasamos por la tabla intermedia
          include: [
            {
              model: Pelicula,//relacionamos y mostramos.
            },
          ],
        },
      ],
    });
    if (!data) throw new Error("No hay Resultados / vacio");
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const createCharacter = async (req, res, next) => {//funcion para hacer post de un personaje
  try {
    const imagen = publicUrl + `/${req.file.filename}`; // creamos url para imagen guardada en nuestra carpeta estatica en nuestro server
    const data = { ...req.body, imagen };
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

const deleteCharacter = async (req, res, next) => {//funcion para hacer delete de un personaje
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

const updateCharacter = async (req, res, next) => {//funcion para hacer un put de un personaje
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

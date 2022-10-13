const Movie_Character = require("../models/Movie_Character");
const Pelicula = require("../models/Pelicula");
const Personaje = require("../models/personaje");
const Genero = require("../models/Genero");
const {moviesQueryHandler} = require("../utils/queryParams");
let publicUrl = "http://localhost:3000"

const getMovies = async (req, res, next) => { //funcion get para Lista de Peliculas
  try {
    let data = await Pelicula.findAll();
    if (!data.length) throw new Error("No hay resultados / vacio")
    if(req.query){
      let queryData = await moviesQueryHandler(req,res,next); // funcion que maneja los parametros por query !
      res.json(queryData);
    
    }else{
      let miData = data.map((el) => { // modificamos forma de enviar los datos
        const rta = {
          imagen: el.imagen,
          titulo: el.titulo,
          fechaCrea: el.fechaCrea
        }
        return rta
      })
      res.json(miData);
    }

  } catch (error) {
    return next(error);
  }
};

const getOneMovie = async (req, res, next) => { // funcion get para obtener 1 Pelicula
  try {
    const id = req.params.id;
    const data = await Pelicula.findOne({
      where: {
        id: id,
      },
      include: { // incluimos relacion para mostrar datos de las tablas relacionadas.
        model: Movie_Character,
        include: [
          {
            model: Personaje,//mostramo tabla relacionada
          },
        ],
        
      }
      
    });
    if (!data) throw new Error("No hay resultados / vacio")
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {//funcion post para crear 1 Pelicula
  try {
    const imagen = publicUrl + `/${req.file.filename}`;
    const data = { ...req.body, imagen };
    const movie = await Pelicula.create(data);
    await Movie_Character.create({
      peliculaId: movie.id,
      personajeId: req.body.personajeId,
    });
    res.json(movie);
  } catch (error) {
    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {//funcion delete para borrar 1 Pelicula
  try {
    const data = await Pelicula.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const updateMovie = async (req, res, next) => {// funcion put para modificar 1 Pelicula
  try {
    const image = publicUrl + `/${req.file.filename}`;
    let newData = { ...req.body, image };

    let data = await Pelicula.findOne({
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
  getMovies,
  createMovie,
  getOneMovie,
  deleteMovie,
  updateMovie,
};

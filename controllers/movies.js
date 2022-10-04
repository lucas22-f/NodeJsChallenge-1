const Movie_Character = require("../models/Movie_Character");
const Pelicula = require("../models/Pelicula");
const Personaje = require("../models/personaje");
const Genero = require("../models/Genero");


const getMovies = async (req, res) => {
  try {
    const data = await Pelicula.findAll();
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const getOneMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Pelicula.findOne({
      where: {
        id: id,
      },
      include: {
        model: Movie_Character,
        include: [
          {
            model: Personaje,
          },
        ],
      },
    });
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res) => {
  try {
    const data = { ...req.body };
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

const deleteMovie = async (req, res) => {
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

const updateMovie = async (req, res) => {
  try {
    let newData = { ...req.body };
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

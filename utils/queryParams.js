const Movie_Character = require("../models/Movie_Character");
const Pelicula = require("../models/pelicula");
const Personaje = require("../models/personaje"); 

const charactQueryHandler = async (req, res, next) => { //creacion de funcion manejadora de query params donde verificamos que parametro esta llegando
    // y retornamos lo que se nos pida. En este caso para PERSONAJES.
  try {
    if (req.query.name) {
      data = await Personaje.findAll({ where: { nombre: req.query.name } });
      return data;
    }
    if (req.query.age) {
      data = await Personaje.findAll({ where: { edad: req.query.age } });
      return data;
    }
    if (req.query.movies) {
      let data = await Personaje.findAll({
        include: [
          {
            model: Movie_Character,
            include: [
              {
                model: Pelicula,
                where: {
                  id: req.query.movies,
                },
              },
            ],
          },
        ],
      });
      return data;
    }
  } catch (error) {
    next(error);
  }
};

const moviesQueryHandler = async (req, res, next) => {
    //creacion de funcion manejadora de query params donde verificamos que parametro esta llegando
    // y retornamos lo que se nos pida. En este caso para PELICULAS.
  try {
    if (req.query.name) {
      data = await Pelicula.findAll({ where: { titulo: req.query.name } });
      return data
    }
    if (req.query.genre) {
      data = await Pelicula.findAll({ where: { generoId: req.query.genre } });
      return data
    }
    if (req.query.order == "ASC") {
      let data = await Pelicula.findAll();
      let querydata = data.map((el) => {
        let rta = {
          id: el.id,
          titulo: el.titulo,
          imagen: el.imagen,
          fechaCrea: el.fechaCrea,
        };
        return rta;
      });
      querydata.sort((a, b) => { // ordenamiento en base a una propiedad en este caso "titulo":
        return a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase());
      });

      return querydata;
    } else if (req.query.order == "DESC") {
      let data = await Pelicula.findAll();
      let querydata = data.map((el) => {
        let rta = {
          id: el.id,
          titulo: el.titulo,
          imagen: el.imagen,
          fechaCrea: el.fechaCrea,
        };
        return rta;
      });
      querydata.sort((a, b) => {// ordenamiento en base a una propiedad en este caso "titulo":
        return b.titulo.toLowerCase().localeCompare(a.titulo.toLowerCase());
      });
      return querydata
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { charactQueryHandler,moviesQueryHandler };

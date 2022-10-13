const Movie_Character = require("../models/Movie_Character");
const Pelicula = require("../models/Pelicula");
const Personaje = require("../models/personaje");
const Genero = require("../models/Genero");
let publicUrl = "http://localhost:3000"

const getMovies = async (req, res, next) => {
  try {
    let data = await Pelicula.findAll();
    if (!data.length) throw new Error("No hay resultados / vacio")

    if (req.query.name) {
      data = await Pelicula.findAll({ where: { titulo: req.query.name } })
    }
    if (req.query.genre) {
      data = await Pelicula.findAll({ where: { generoId: req.query.genre } })
    }
    if (req.query.order == 'ASC') {
      let data = await Pelicula.findAll()
      let querydata = data.map((el) => {
        let rta = {
          id:el.id,
          titulo:el.titulo,
          imagen:el.imagen,
          fechaCrea: el.fechaCrea
        }
        return rta
      });
      querydata.sort((a,b)=>{
        return (a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase()))
      });
     
      
      res.json(querydata)
    }else
    if (req.query.order == 'DESC') {
      let data = await Pelicula.findAll()
      let querydata = data.map((el) => {
        let rta = {
          id:el.id,
          titulo:el.titulo,
          imagen:el.imagen,
          fechaCrea: el.fechaCrea
        }
        return rta
      })
      querydata.sort((a,b)=>{
        return (b.titulo.toLowerCase().localeCompare(a.titulo.toLowerCase()))
      });
      res.json(querydata)
    }else{
      let miData = data.map((el) => {
        const rta = {
          imagen: el.imagen,
          titulo: el.titulo,
          fechaCrea: el.fechaCrea
        }
        return rta
      })
      if(!data.length)throw new Error("vacio");
      res.json(miData);
    }


    

  } catch (error) {
    return next(error);
  }
};

const getOneMovie = async (req, res, next) => {
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
        
      }
      
    });
    if (!data) throw new Error("No hay resultados / vacio")
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
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

const deleteMovie = async (req, res, next) => {
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

const updateMovie = async (req, res, next) => {
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

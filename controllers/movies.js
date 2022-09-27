const Pelicula = require("../models/Pelicula");

const getMovies = (req, res, next) => {
    res.json({ message: "Hola mundo" });
}


const createMovie = async (req, res, next) => {
    const data = { ...req.body };
    const movie = await Pelicula.create(data);
    res.json(movie);

}

module.exports = { getMovies, createMovie }
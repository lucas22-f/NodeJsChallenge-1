const Genero = require("../models/Genero")
let publicUrl = "http://localhost:3000"

const getGenders = async (req,res,next) => { // funcion para hacer get de Generos
    try {
        let data = await Genero.findAll()
        res.json(data);
    } catch (error) {
        next(error)
    }

}
const createGender = async (req,res,next) => {// funcion post para 1 Genero
    try {
        const imagen = publicUrl + `/${req.file.filename}`;
        const miData = { ...req.body, imagen };
        let data = await Genero.create(miData)
        res.json(data);
    } catch (error) {
        next(error)
    }

}
const updateGender = async (req,res,next) => {//funcion put para 1 Genero
    try {
        const imagen = publicUrl + `/${req.file.filename}`;
        const miData = { ...req.body, imagen };
        let data = await Genero.findOne({where:{id:req.params.id}})
        await data.update(miData);
        await data.save();
        res.json(data);

    } catch (error) {
        next(error)
    }
}

const deleteGender = async (req,res,next) => {// funcion delete para un genero
    try {
        let data = Genero.destroy({where:{id:req.params.id}})
        res.json(data);
    } catch (error) {
        next(error)
    }
}


module.exports = { getGenders, createGender, updateGender, deleteGender }


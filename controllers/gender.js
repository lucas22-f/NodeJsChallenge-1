const Genero = require("../models/Genero")


const getGenders = async (req,res,next) => {
    try {
        let data = await Genero.findAll()
        res.json(data);
    } catch (error) {
        next(error)
    }

}
const createGender = async (req,res,next) => {
    try {
        let data = await Genero.create(req.body)
        res.json(data);
    } catch (error) {
        next(error)
    }

}
const updateGender = async (req,res,next) => {
    try {
        let nwData = {...req.body}
        let data = await Genero.findOne({where:{id:req.params.id}})
        await data.update(nwData);
        await data.save();
        res.json(data);

    } catch (error) {
        next(error)
    }
}

const deleteGender = async (req,res,next) => {
    try {
        let data = Genero.destroy({where:{id:req.params.id}})
        res.json(data);
    } catch (error) {
        next(error)
    }
}


module.exports = { getGenders, createGender, updateGender, deleteGender }


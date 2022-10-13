
module.exports = (scheme) => {
    return (req, res, next) => {

        let result = scheme.validate(req.body) //validamos formularios con esquemas de joi
        if (result.error) {
            next(result.error)
        }else{
            next()
        }
    

    }

}
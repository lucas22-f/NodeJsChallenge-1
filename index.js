const express = require("express");
const sequelize = require("./database/db");
const app = express();
require("dotenv").config();
const port = 3000;

async function check() { // funcion para verificar conexion con la bd
        try {
                await sequelize.sync({ force: false });
        } catch (error) {
                console.error('Unable to connect to the database:', error);
        }
}
check();

app.use(express.json()); //config json 
app.use(express.urlencoded({ extended: false }));

app.use("/auth", require("./Router/usersRoute"));// auth route para obtener nuestro token e ingresar a la api
app.use("/", require("./Router/router"));//router de la api


app.listen(port, (err) => {
        err ? console.log(err) : console.log(`sv corriendo en http://localhost:${port}`); //port listen
})


app.use((req, res, next) => {// catch 404;
        let err = new Error("no encontrado");
        err.status = 404;
        next(err);
})

app.use((err, req, res, next) => {//500 handler
        if (!err.status) err.status = 500
        res.status(err.status).json({ status: err.status, message: err.message });
})



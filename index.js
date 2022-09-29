const express = require("express");
const sequelize = require("./database/db");
const app = express();
const port = 3000;
const router = require("./Router/router");


async function check(){
        try {

       await sequelize.sync({force:false});
       
               
       } catch (error) {
       console.error('Unable to connect to the database:', error);
       } 
       
}
check();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(router);



app.get("/",(req,res)=>{
        res.send("<h1>Node JS Alkemy challenge by Lucas Figueroa.</h1>");
})


// catch 404;
app.use((req,res,next)=>{
        let err = new Error("no encontrado");
        err.status = 404;
        res.status(err.status).json({message: err.message});
})



app.listen(port,(err)=>{
        err?console.log(err):console.log(`sv corriendo en http://localhost:${port}`);
})
     
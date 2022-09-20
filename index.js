const express = require("express");
const sequelize = require("./database/db");
const app = express();
const port = 3000;
const router = require("./Router/router");

async function check(){
         try {

        await sequelize.sync({ force: false })
                
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        } 
        
}
check();

app.get("/",(req,res)=>{
        res.send("<h1>Node JS Alkemy challenge by Lucas Figueroa.</h1>");
})
app.use(router);

// catch 404;

app.use((req,res,next)=>{
        let err = new Error("no encontrado");
        err.status = 404;
        next(err);
})

//err handdler;
app.use((err,res)=>{
        if(!err.status){
        err.status = 500;
        }
        res.status(err.status).json({status:err.status,message:err.message});
})


app.listen(port,(err)=>{
        err?console.log(err):console.log(`sv corriendo en http://localhost:${port}`);
})
     
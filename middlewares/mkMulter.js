const multer = require("multer");

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const pathStorage = `${__dirname}/../static` // creamos pequeño algoritmo en el middleware de multer para guardar las imagenes en carpeta estatica.
            callback(null, pathStorage)
            
        },
        filename: (req, file, callback) => {
            const ext = file.originalname.split(".").pop()
            const filename = `file_${Date.now()}.${ext}`; // pequeño algoritmo
            callback(null, filename)
        }
    })



const upload = multer({ storage });


module.exports = upload;
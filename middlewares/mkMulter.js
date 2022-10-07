const multer = require("multer");

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const pathStorage = `${__dirname}/../static`
            callback(null, pathStorage)
            
        },
        filename: (req, file, callback) => {
            const ext = file.originalname.split(".").pop()
            const filename = `file_${Date.now()}.${ext}`;
            callback(null, filename)
        }
    })



const upload = multer({ storage });


module.exports = upload;
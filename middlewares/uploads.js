const fs = require('fs');
const multer = require("multer");

const maxSize = 20 * 1024 * 1024;
const date = new Date();
const uploadPath = `${process.env.PWD}/uploads/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/`;

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, {
        recursive: true
    });
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        let fileName = `${new Date().getTime()}--${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");


module.exports = upload;

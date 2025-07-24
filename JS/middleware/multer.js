const path = require('path');
const fs = require('fs');
const multer  = require('multer')

const uploadPath = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


const stokage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueName = file.originalname;
        cb(null, uniqueName)
    }
})

const upload = multer({ storage: stokage })

module.exports = upload;
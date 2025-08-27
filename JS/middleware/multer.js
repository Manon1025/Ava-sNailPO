// TODO Module
    // * path naviguer dans les chemins des fichiers
const path = require('path');
    // * fs permet de manipuler le système de fichiers
const fs = require('fs');
const multer  = require('multer')

// TODO: Configuration de Multer
const uploadPath = path.join(__dirname, '../public/uploads');
    // * Vérifier si le dossier de destination existe, sinon le créer
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// TODO: Configuration du stockage
const storage = multer.diskStorage({
    // * destination définit le dossier de destination pour les fichiers téléchargés
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    // * filename définit le nom du fichier téléchargé
    filename: (req, file, cb) => {
        const uniqueName = file.originalname;
        cb(null, uniqueName)
    }
})

// TODO: Exporter le middleware
const upload = multer({ storage: storage })

// TODO: Exporter le middleware
module.exports = upload;
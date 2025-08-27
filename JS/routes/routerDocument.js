// TODO: MODULE
const express = require('express')
const router = express.Router()

// TODO: Fichier
const controllerDocument = require('../controller/controllerDocument')
const uploads = require('../middleware/multer')

// TODO: Routes
    // * Liste des documents
router.get('/documents', controllerDocument.index)

    // * Ajouter un document
    // ! upload.single('document') permet d'importer un fichier
router.post('/add-document', uploads.single('document') ,controllerDocument.create)

// TODO: Exporter le routeur
module.exports = router
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

    // * Modifier un document
router.get('/edit-document/:id', controllerDocument.edit)
router.post('/edit-document/:id', uploads.single('document'), controllerDocument.update)

    // * Supprimer un document
router.post('/delete-document/:id', controllerDocument.destroy)

// TODO: Exporter le routeur
module.exports = router
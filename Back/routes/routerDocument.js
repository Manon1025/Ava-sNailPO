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
router.get('/ajout-document', (req, res) => {
    if (!req.user || req.user.role !== 1) return res.redirect('/')
    res.render('pages/admin/addDocument.ejs', {
        title: 'Ajouter Document', 
        user: req.user,
        details: [],
        formData: {}
    })
})

    // ! upload.single('document') permet d'importer un fichier
router.post('/add-document', uploads.single('document') ,controllerDocument.create)

    // * Modifier un document
router.get('/edit-document/:id', controllerDocument.edit)
router.post('/edit-document/:id', uploads.single('document'), controllerDocument.update)

    // * Supprimer un document
router.post('/delete-document/:id', controllerDocument.destroy)

// TODO: Exporter le routeur
module.exports = router
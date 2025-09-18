// TODO: Module
const express = require('express')
const router = express.Router()

// TODO: Fochier
const controllerEmployee = require('../controller/controllerEmployee')
const upload = require('../middleware/multer')

// TODO: Routes
    // * Liste des employés
router.get('/listeEmployer', controllerEmployee.index)

    // * Détails employé
router.get('/voir-plus/:id', controllerEmployee.show)

    // * Supprimer un employé
router.delete('/delete/:id', controllerEmployee.destroy)

    // * Ajouter un employé
    // ! upload.single('avatar') permet d'importer un fichier
router.post('/add', upload.single('avatar') , controllerEmployee.create)

// TODO: Exporter le routeur
module.exports = router
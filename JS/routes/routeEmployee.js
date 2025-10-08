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

    // * Désactiver un employé
router.post('/deactivate/:id', controllerEmployee.deactivate)

    // * Ajouter un employé
    // ! upload.single('avatar') permet d'importer un fichier
router.post('/add', upload.single('avatar') , controllerEmployee.create)

    // * Éditer un employé
router.get('/updateEmployee/:id', controllerEmployee.edit)
router.post('/updateEmployee/:id', upload.single('avatar'), controllerEmployee.update)

// TODO: Exporter le routeur
module.exports = router
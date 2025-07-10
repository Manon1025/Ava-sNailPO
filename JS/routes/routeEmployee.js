const express = require('express')
const router = express.Router()
const controllerEmployee = require('../controller/controllerEmployee')



// ! Liste des employée JSON
router.get('/listeEmployer', controllerEmployee.index)

router.get('/baseDonnee/:id', controllerEmployee.show)

router.delete('/delete/:id', controllerEmployee.destroy)

router.post('/add', controllerEmployee.create)

module.exports = router
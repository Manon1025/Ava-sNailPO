const express = require('express')
const router = express.Router()

const controllerEmployee = require('../controller/controllerEmployee')
const upload = require('../middleware/multer')

// ! Liste des employée JSON
router.get('/listeEmployer', controllerEmployee.index)

router.get('/voir-plus/:id', controllerEmployee.show)

router.delete('/delete/:id', controllerEmployee.destroy)

router.post('/add', upload.single('avatar') , controllerEmployee.create)

module.exports = router
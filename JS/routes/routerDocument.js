const express = require('express')
const router = express.Router()

const controllerDocument = require('../controller/controllerDocument')
const uploads = require('../middleware/multer')

router.get('/documents', controllerDocument.index)

router.post('/add-document', uploads.single('document') ,controllerDocument.create)

module.exports = router
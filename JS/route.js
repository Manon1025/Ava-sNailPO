const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/', controller.index)

router.get('/:id', controller.show)

router.delete('/delete/:id', controller.destroy)

router.post('/add', controller.create)

module.exports = router
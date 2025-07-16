const express = require('express')
const router = express.Router()
const controllerLogin = require('../controller/controllerLogin')

router.get('/login', (req, res) => {
    res.render('login.ejs', {title: 'Se Connecter'})
})

router.post('/login', controllerLogin.create)

module.exports = router
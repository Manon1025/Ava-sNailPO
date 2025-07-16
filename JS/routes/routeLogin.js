const express = require('express')
const router = express.Router()
const controllerLogin = require('../controller/controllerLogin')

router.get('/login', (req, res) => {
    res.render('login.ejs', {title: 'Se Connecter', hideLayout: true})
})

router.post('/login', controllerLogin.create)

router.get('/logout', controllerLogin.destroy)

router.delete('/logout', controllerLogin.destroy)


module.exports = router
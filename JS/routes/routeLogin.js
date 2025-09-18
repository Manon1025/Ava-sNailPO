// TODO: Module
const express = require('express')
const router = express.Router()

// TODO: Fichier
const controllerLogin = require('../controller/controllerLogin')

// TODO: Routes
    // * Page Se connecter
    // ! hideLayout permet d'enlever le CSS des autres pages, et en faire un spécifique à lui
router.get('/login', (req, res) => {
    res.render('login.ejs', {title: 'Se Connecter', hideLayout: true})
})

    // * Authentification
router.post('/login', controllerLogin.create)

    // * Page Se déconnecter
router.get('/logout', controllerLogin.destroy)

    // * Authentification
router.delete('/logout', controllerLogin.destroy)

// TODO: Exporter le routeur
module.exports = router
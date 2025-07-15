const express = require('express')
const router = express.Router()

// ! Pages principales
router.get('/', (req, res) => {
    res.render('pages/homePage.ejs', {title: 'Accueil'})
})

router.get('/planning', (req, res) => {
    res.render('pages/planning.ejs', {title: 'Planning'})
})

router.get('/documents', (req, res) => {
    res.render('pages/doc.ejs', {title: 'Documents'})
})

router.get('/messagerie', (req, res) => {
    res.render('pages/tchat.ejs', {title: 'Messagerie'})
})

router.get('/profil', (req, res) => {
    res.render('pages/profil.ejs', {title: 'Profil'})
})

router.get('/login', (req, res) => {
    res.render('login.ejs', {title: 'Se_Connecter'})
})

// ! Pages vu que par l'admin
router.get('/ajout-salarie', (req, res) => {
    res.render('pages/admin/addSalarie.ejs', {title: 'Ajouter un Salarié'})
})

module.exports = router
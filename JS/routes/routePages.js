const express = require('express')
const router = express.Router()

// ! Pages principales
exports.homePage = router.get('/', (req, res) => {
    res.render('pages/homePage.ejs', {title: 'Accueil'})
})

exports.planning = router.get('/planning', (req, res) => {
    res.render('pages/planning.ejs', {title: 'Planning'})
})

exports.doc = router.get('/documents', (req, res) => {
    res.render('pages/doc.ejs', {title: 'Documents'})
})

exports.tchat = router.get('/messagerie', (req, res) => {
    res.render('pages/tchat.ejs', {title: 'Messagerie'})
})

exports.addSalarie = router.get('/ajout-salarie', (req, res) => {
    res.render('pages/addSalarie.ejs', {title: 'Ajouter un Salarié'})
})

exports.profil = router.get('/profil', (req, res) => {
    res.render('pages/profil.ejs', {title: 'Profil'})
})

// module.exports = router
const express = require('express')
const router = express.Router()

// ! Pages principales
router.get('/',(req, res) => {
    const fname = req.session.user ? req.session.user.fname : 'Visiteur';
    res.render('pages/homePage.ejs', {title: 'Accueil', fname})
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
    const fname = req.session.user ? req.session.user.fname : 'Visiteur'
    const lname = req.session.user ? req.session.user.lname : 'Visiteur'
    const poste = req.session.user ? req.session.user.poste : 'Visiteur'
    const email = req.session.user ? req.session.user.email : 'Visiteur'
    const phone = req.session.user ? req.session.user.phone : 'Visiteur'
    const adresse = req.session.user ? req.session.user.adresse : 'Visiteur'
    const city = req.session.user ? req.session.user.city : 'Visiteur'
    const complement = req.session.user ? req.session.user.complement : 'Visiteur'
    res.render('pages/profil.ejs', {title: 'Profil', fname, lname, poste, email, phone, adresse, city, complement})
})


// ! Pages vu que par l'admin
router.get('/ajout-salarie', (req, res) => {
    res.render('pages/admin/addSalarie.ejs', {title: 'Ajouter un Salarié'})
})

module.exports = router
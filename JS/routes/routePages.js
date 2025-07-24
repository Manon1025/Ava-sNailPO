const express = require('express')
const router = express.Router()

// ! Pages principales
router.get('/',(req, res) => {
    const fname = req.session.user ? req.session.user.fname : 'Visiteur';
    res.render('pages/homePage.ejs', {title: 'Accueil', fname,  user: req.session.user})
})

router.get('/planning', (req, res) => {
    res.render('pages/planning.ejs', {title: 'Planning', user: req.session.user})
})

router.get('/documents', (req, res) => {
    res.render('pages/doc.ejs', {title: 'Documents', user: req.session.user})
})

router.get('/messagerie', (req, res) => {
    res.render('pages/tchat.ejs', {title: 'Messagerie', user: req.session.user})
})

router.get('/profil', (req, res) => {
const user = req.session.user;

    const fname   = user ? user.fname   : 'Visiteur';
    const lname   = user ? user.lname   : 'Visiteur';
    const poste   = user ? user.poste   : 'Visiteur';
    const email   = user ? user.email   : 'Visiteur';
    const phone   = user ? user.phone   : 'Visiteur';
    const adresse = user ? user.adresse : 'Visiteur';
    const city    = user ? user.city    : 'Visiteur';
    const cp      = user ? user.cp      : 'Visiteur';
    const avatar  = user && user.avatar ? user.avatar : 'avatar-vide.png';

    // *user: req.session.user me permet de bloqué le lien salarié si la personne n'est pas admin
    res.render('pages/profil.ejs', {
        title: 'Profil',
        fname, lname, poste, email, avatar, phone, adresse, city, cp,
        user
    });
})


// ! Pages vu que par l'admin
router.get('/ajout-salarie', (req, res) => {
    res.render('pages/admin/addSalarie.ejs', {title: 'Ajouter un Salarié', user: req.session.user})
})

module.exports = router
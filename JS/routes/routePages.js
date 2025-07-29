const express = require('express')
const router = express.Router()

const upload = require('../middleware/multer')

// ! Pages principales
router.get('/',(req, res) => {                                                                      // ? Chemin pour aller sur la page d'accueil                        
    const fname = req.session.user ? req.session.user.fname : 'Visiteur';
    res.render('pages/homePage.ejs', {title: 'Accueil', fname,  user: req.session.user})
})

router.get('/planning', (req, res) => {                                                             // ? Chemin pour aller sur la page planning                                       
    res.render('pages/planning.ejs', {title: 'Planning', user: req.session.user})
})

router.get('/documents', (req, res) => {                                                            // ? Chemin pour aller sur la page documents
    res.render('pages/doc.ejs', {title: 'Documents', user: req.session.user})
})

router.get('/messagerie', (req, res) => {                                                           //? Chemin pour aller sur la page messagerie
    res.render('pages/tchat.ejs', {title: 'Messagerie', user: req.session.user})                    
})

router.get('/profil',(req, res) => {                                                                // ? Chemin pour aller sur la page profil
    const fname   = res.locals.user.fname
    const lname   = res.locals.user.lname
    const poste   = res.locals.user.poste
    const email   = res.locals.user.email
    const phone   = res.locals.user.phone
    const adresse = res.locals.user.adresse
    const city   = res.locals.user.city
    const cp      = res.locals.user.cp
    const avatar  = res.locals.user.avatar || 'ASSET/img/avatar-vide.png' ;

    // *user: req.session.user me permet de bloqué le lien salarié si la personne n'est pas admin
    res.render('pages/profil.ejs', {
        title: 'Profil',
        fname, lname, poste, email, avatar, phone, adresse, city, cp,
    });
})

// ! Pages vu que par l'admin
router.get('/ajout-salarie', (req, res) => {
    res.render('pages/admin/addSalarie.ejs', {title: 'Ajouter un Salarié', user: req.session.user})
})

module.exports = router
// TODO: Module
const express = require('express')
const router = express.Router()

// TODO: Routes Tous les Users
    // * Accueil
router.get('/',(req, res) => {                                                                                              
    const fname = req.session.user ? req.session.user.fname : 'Visiteur';
    res.render('pages/homePage.ejs', {title: 'Accueil', fname,  user: req.session.user})
})

    // * Planning
router.get('/planning', (req, res) => {                                                                                                  
    res.render('pages/planning.ejs', {title: 'Planning', user: req.session.user})
})

    // * Messagerie
router.get('/messagerie', (req, res) => {                                                           
    res.render('pages/tchat.ejs', {title: 'Messagerie', user: req.session.user})                    
})

    // * Profil
router.get('/profil',(req, res) => {                                                                
    const fname   = res.locals.user.fname
    const lname   = res.locals.user.lname
    const poste   = res.locals.user.poste
    const email   = res.locals.user.email
    const phone   = res.locals.user.phone
    const adresse = res.locals.user.adresse
    const city   = res.locals.user.city
    const cp      = res.locals.user.cp
    // ! Avatar importer, si il n'y a pas d'avatar on en ajoute un de base
    const avatar  = res.locals.user.avatar || 'ASSET/img/avatar-vide.png' ;

    res.render('pages/profil.ejs', {
        title: 'Profil',
        fname, lname, poste, email, avatar, phone, adresse, city, cp,
    });
})

// TODO: Routes Admin
    //  ! user: req.session.user me permet de bloqué le lien salarié si la personne n'est pas admin
    // * Ajouter un salarié
router.get('/ajout-salarie', (req, res) => {
    res.render('pages/admin/addSalarie.ejs', {title: 'Ajouter un Salarié', user: req.session.user})
})

    // * Ajouter un document
router.get('/ajout-document', (req, res) => {
    res.render('pages/addDocument.ejs', {title: 'Ajouter Document', user: req.session.user})
})

// TODO: Exporter le routeur
module.exports = router
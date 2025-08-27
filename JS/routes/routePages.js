// TODO: Module
const express = require('express')
const router = express.Router()

// TODO: Routes Tous les Users
    // * Accueil
router.get('/',(req, res) => {                                                                                              
    const fname = req.user.fname;
    res.render('pages/homePage.ejs', {title: 'Accueil', fname,  user: req.user})
})

    // * Planning
router.get('/planning', (req, res) => {                                                                                                  
    res.render('pages/planning.ejs', {title: 'Planning', user: req.user})
})

    // * Messagerie
router.get('/messagerie', (req, res) => {                                                           
    res.render('pages/tchat.ejs', {title: 'Messagerie', user: req.user})                    
})

    // * Profil
router.get('/profil',(req, res) => { 
    const user = req.user
    if(!user) return res.redirect('/login')
    
    const {
        fname,
        lname,
        poste,
        email,
        phone,
        adresse,
        city,
        cp,
        avatar,
    } = user;
    // const fname   = req.user.fname
    // const lname   = req.user.lname
    // const poste   = req.user.poste
    // const email   = req.user.email
    // const phone   = req.user.phone
    // const adresse = req.user.adresse
    // const city   = req.user.city
    // const cp      = req.user.cp
    // // ! Avatar importer, si il n'y a pas d'avatar on en ajoute un de base
    // const avatar  = req.user.avatar || 'ASSET/img/avatar-vide.png' ;

    res.render('pages/profil.ejs', {
        title: 'Profil',
        fname, 
        lname, 
        poste, 
        email, 
        avatar, 
        phone, 
        adresse, 
        city, 
        cp,
    });
})

// TODO: Routes Admin
    //  ! user: req.session.user me permet de bloqué le lien salarié si la personne n'est pas admin
    // * Ajouter un salarié
router.get('/ajout-salarie', (req, res) => {
    if (!req.user?.admin) return res.redirect('/')
    res.render('pages/admin/addSalarie.ejs', {
        title: 'Ajouter un Salarié', 
        user: req.user})
})

    // * Ajouter un document
router.get('/ajout-document', (req, res) => {
    if (!req.user?.admin) return res.redirect('/')
    res.render('pages/addDocument.ejs', {
        title: 'Ajouter Document', 
        user: req.user})
})

// TODO: Exporter le routeur
module.exports = router
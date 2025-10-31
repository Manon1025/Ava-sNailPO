// TODO: Module
const express = require('express')
const router = express.Router()
const Employee = require('../model/Employee')

// TODO: Routes Tous les Users
    // * Accueil
    // ! req.user récupére les informations de l'utilisateur connecté
router.get('/',(req, res) => {                                                                                              
    const fname = req.user.fname;
    res.render('pages/homePage.ejs', {title: 'Accueil', fname,  user: req.user})
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
        street,
        city,
        cp,
        avatar,
    } = user;

    res.render('pages/profil.ejs', {
        title: 'Profil',
        fname, 
        lname, 
        poste, 
        email, 
        avatar, 
        phone, 
        street, 
        city, 
        cp,
        user: req.user
    });
})

// TODO: Exporter le routeur
module.exports = router
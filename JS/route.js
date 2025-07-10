const express = require('express')
const router = express.Router()
const controllerEmployee = require('./controller/controllerEmployee')

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

router.get('/ajout-salarie', (req, res) => {
    res.render('pages/addSalarie.ejs', {title: 'Ajouter un Salarié'})
})

router.get('/profil', (req, res) => {
    res.render('pages/profil.ejs', {title: 'Profil'})
})

router.get('/listeEmployer', (req, res) =>{
    res.render('pages/listingEmployee.ejs', {title: 'Liste des employés'})
})

// ! Liste des employée JSON
router.get('/baseDonnee', controllerEmployee.index)

router.get('/baseDonnee/:id', controllerEmployee.show)

router.delete('/delete/:id', controllerEmployee.destroy)

router.post('/add', controllerEmployee.create)

module.exports = router
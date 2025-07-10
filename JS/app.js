// ! Importation
    // * MODULE
const express =  require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path');

    // * FICHIER
const router = require('./route')
const connexionDB = require('./database')

// ! Configuration EJS
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')
app.use(expressLayouts)
app.set('layout', 'layout')
app.use(express.static(path.join(__dirname, '../public'))); // ? cette ligne permet de chercher le fichier public en dehors du fichier JS

// ! Appel de la connexion database MongoDB
connexionDB()


// ! Middleware pour parser le corps des requêtes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ! lancement serv
app.use('/', router)


app.listen(1024, () => {
    console.log('Bienvenue sur le serveur 1024')
})
// ! Importation
    // * MODULE
const express =  require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path');

    // * FICHIER
const router = require('./routes/routeEmployee')
const connexionDB = require('./data/database')

// ! Configuration EJS
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')
app.set('layout', 'layout')

// ! Middleware pour parser le corps des requêtes
app.use(express.json())
app.use(expressLayouts)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public'))); // ? cette ligne permet de chercher le fichier public en dehors du fichier JS

// ! Appel de la connexion database MongoDB
connexionDB()

// ! lancement serv
app.use('/', router)


app.listen(1024, () => {
    console.log('Bienvenue sur le serveur 1024')
})
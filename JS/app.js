// ! Importation
    // * MODULE
const express =  require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

    // * FICHIER
const router = require('./route')
const connexionDB = require('./database')



// ! Configuration EJS
// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/../views')
// app.use(expressLayouts)
// app.set('layout', 'layout')


// ! Appel de la connexion database MongoDB
connexionDB()


// ! Middleware pour parser le corps des requêtes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ! lancement serv
app.use('/', router)

// app.get('/', (req, res) => {
//     res.render('pages/homePage.ejs', {title: 'homePage'})
// })

app.listen(1024, () => {
    console.log('Bienvenue sur le serveur 1024')
})
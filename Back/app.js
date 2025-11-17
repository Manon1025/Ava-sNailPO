// ! Importation
    // * MODULE
const express =  require('express')
const app = express()
const path = require('path');                                               // ? permet de gérer les chemins de fichiers
const expressLayouts = require('express-ejs-layouts')                       // ? permet de gérer les layouts EJS
const cookieParser = require('cookie-parser')                               // ? permet de parser les cookies
require('dotenv').config()                                                  // ? permet de charger les variables d'environnement

    // * FICHIER
const routerEmployee = require('./routes/routeEmployee')
const routerPages = require('./routes/routePages')
const routerDocument = require('./routes/routerDocument')
const routerLogin = require('./routes/routeLogin')
const routerPlanning = require('./routes/routePlanning')
const routerClient = require('./routes/routeClient')
const connectBDD = require('./config/connect_bdd')

    // * Associations des modèles (important de les charger avant la connexion BDD)
require('./model/associations')

    // * Configuration EJS
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')
app.set('layout', 'layout')

// ! Middleware 
    // * Express
app.use(expressLayouts)                                                     // ? permet d'avoir un layout commun pour toutes les pages
app.use(express.json())
app.use(express.urlencoded({ extended: true }))                             // ? permet de parser les données des formulaires pour les envoyer dans req.body
app.use(express.static(path.join(__dirname, '../public')));                 // ? cette ligne permet de chercher le fichier public en dehors du fichier JS

    // * Multer
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))) // ? permet de servir les fichiers statiques dans le dossier uploads

    // * Cookie / Session
const isAuth = require('./middleware/isAuth')
const currentUser = require('./middleware/currentUser')

app.use(cookieParser())                                                     // ? permet de parser les cookies
app.use(currentUser)                                                       // ? permet de récupérer les informations de l'utilisateur connecté



// ! MySQL
    // * Connexion à la base de données
connectBDD()

// ! Routes
    // * Auth
app.use('/', routerLogin)

    // * Routes protégées
app.use('/', isAuth ,routerPages)
app.use('/', isAuth ,routerDocument)
app.use('/', isAuth ,routerEmployee)
app.use('/', isAuth ,routerPlanning)
app.use('/', isAuth ,routerClient)

// ! Lancement du serveur
const port = process.env.PORT
app.listen(port, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${port}`)
})
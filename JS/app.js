// ! Importation
    // * MODULE
const express =  require('express')
const app = express()
const path = require('path');                                               // ? permet de gérer les chemins de fichiers
const expressLayouts = require('express-ejs-layouts')                       // ? permet de gérer les layouts EJS
const cookieParser = require('cookie-parser')                               // ? permet de parser les cookies
const session = require('express-session')                                  // ? permet de gérer les sessions
const MongoStore = require('connect-mongo');

require('dotenv').config();

    // * FICHIER
const routerEmployee = require('./routes/routeEmployee')
const routerPages = require('./routes/routePages')
const routerDocument = require('./routes/routerDocument')
const routerLogin = require('./routes/routeLogin')
const connexionDB = require('./data/database')
const isAuth = require('./middleware/isAuth')

// ! Configuration EJS
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')
app.set('layout', 'layout')

// ! Middleware 
app.use(express.json())
app.use(expressLayouts)                                                     // ? permet d'avoir un layout commun pour toutes les pages
app.use(express.urlencoded({ extended: true }))                             // ? permet de parser les données des formulaires pour les envoyer dans req.body
app.use(express.static(path.join(__dirname, '../public')));                 // ? cette ligne permet de chercher le fichier public en dehors du fichier JS
app.use(cookieParser())                                                     // ? permet de parser les cookies
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))) // ? permet de servir les fichiers statiques dans le dossier uploads
app.use(session({
    secret: process.env.SESSION_SECRET,                             // ? clé secrète pour signer les cookies de session
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({                                               // ? à mettre à true si tu utilises HTTPS
        mongoUrl : process.env.DataMongoURL,
        ttl: 14 * 24 * 60 * 60
        }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',                      // ? True si HTTPS
        httpOnly: true,
        maxAge: 14 * 34 * 60 * 60 * 1000                                    // ? 14 jours en ms
    }
}))

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
})


// ! MongoDB
connexionDB()

// ! lancement serveur
app.use('/', routerLogin)
app.use('/', isAuth ,routerPages)
app.use('/', isAuth ,routerDocument)
app.use('/', isAuth ,routerEmployee)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})
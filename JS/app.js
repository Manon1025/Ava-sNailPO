// ! Importation
    // * MODULE
const express =  require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path');
const cookieParser = require('cookie-parser')
const session = require('express-session')

    // * FICHIER
const routerEmployee = require('./routes/routeEmployee')
const routerPages = require('./routes/routePages')
const routerLogin = require('./routes/routeLogin')
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
app.use(cookieParser())

// ! Appel de la connexion database MongoDB
connexionDB()

// ! lancement serv
app.use(session({
    secret: 'votre_secret_ici', // choisis une clé secrète forte
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // à mettre à true si tu utilises HTTPS
}))

function isAuth(req, res, next){
    if(!req.session.user) { 
        return res.redirect("/login");
    }
    next();
}

app.use('/', routerLogin)
app.use('/', isAuth ,routerPages)
app.use('/', isAuth ,routerEmployee)

app.listen(1024, () => {
    console.log('Bienvenue sur le serveur 1024')
})
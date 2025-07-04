// ! Importation
    // * MODULE
const express =  require('express')
const app = express()

    // * FICHIER
const Employee = require('./model/Employee')
const connexionDB = require('./database')


// ! Appel de la connexion database MongoDB
connexionDB()

// ! lancement serv
app.get('/employee', async(req, res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json({employees})
    } catch (err) {
        throw err 
    }
})

app.listen(1024, () => {
    console.log('Bienvenue sur le serveur 1024')
})
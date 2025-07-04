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
    // * Visu sur toute la liste des employées
app.get('/employee', async(req, res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json({employees})
    } catch (err) {
        throw err 
    }
})

    // * Visu sur un des employées
app.get('/employee/:id', async(req,res) => {
    try {
        const id = req.params['id']
        const oneEmployee = await Employee.findById(id)
        res.status(200).send(`
            <h1> ${oneEmployee.fname} ${oneEmployee.lname} </h1>
            `)
    } catch (err) {
        throw err
    }
})

    // * Pouvoir supprimer un employee
app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params['id']
        let result = await Employee.findByIdAndDelete(id)
        // if (!result) {
        //     return res.status(404).send('Employé non trouvé')
        // }
        res.status(200).json({ message: `employé ${result.fname} ${result.lname} supprimé` })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(1024, () => {
    console.log('Bienvenue sur le serveur 1024')
})
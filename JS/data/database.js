const mongoose = require('mongoose')
const Poste = require('../model/Poste')
const data = require('./dataPoste')

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Projet')
        console.log('connexion réussie !')

        // await Poste.insertMany(data)
        // console.log('Salariés insérés !')
    } catch (err) {
        throw err
    }
}
const mongoose = require('mongoose')
const Employee = require('./model/Employee')
const data = require('./data')

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Projet')
        console.log('connexion réussie !')

        // await Employee.insertMany(data)
        // console.log('Salariés insérés !')
    } catch (err) {
        throw err
    }
}
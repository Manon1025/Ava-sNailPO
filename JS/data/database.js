const mongoose = require('mongoose')
// const Category = require('../model/Category')
// const data = require('./dataCategory')

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Projet')
        console.log('connexion réussie !')

        // await Category.insertMany(data)
        // console.log('Salariés insérés !')
    } catch (err) {
        throw err
    }
}
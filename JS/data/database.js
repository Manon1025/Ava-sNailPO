const mongoose = require('mongoose')

// Employee model
const Employee = require('../model/Employee')
const data = require('././dataEmployee')

// Poste model
const Poste = require('../model/Poste')
const posteData = require('././dataPoste')

// Document model
const Document = require('../model/Document')
const documentData = require('././dataDocument')

// Category model
const Category = require('../model/Category')
const categoryData = require('././dataCategory')

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Projet')
        console.log('connexion réussie !')

        // await Employee.insertMany(data)
        // console.log('Salariés insérés !')

        // await Poste.insertMany(posteData)
        // console.log('Postes insérés !')

        // await Document.insertMany(documentData)
        // console.log('Documents insérés !')

        // await Category.insertMany(categoryData)
        // console.log('Catégories insérées !')
    } catch (err) {
        throw err
    }
}
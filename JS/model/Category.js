// TODO: Module
const mongoose = require('mongoose')

// TODO: Schéma de données pour les catégories
const CategorySchema = new mongoose.Schema ({
    _id: {type : mongoose.Schema.ObjectId, auto: true}, 
    name: String,
})

// TODO: Exporter le modèle
module.exports = mongoose.model('Category', CategorySchema)
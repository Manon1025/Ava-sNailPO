// TODO: Module
const mongoose = require('mongoose')

// TODO: Schéma de données pour les documents
const DocumentsSchema = new mongoose.Schema ({
    _id: {type : mongoose.Schema.ObjectId, auto: true},
    name: String,
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: '',
    },
    fileName: String,
    created_at: Date,
})

// TODO: Exporter le modèle
module.exports = mongoose.model('Document', DocumentsSchema)
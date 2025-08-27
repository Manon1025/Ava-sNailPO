// TODO: Module
const mongoose = require('mongoose')

// TODO: Schéma de données pour les employés
const EmployeeSchema = new mongoose.Schema ({
    _id: {type : mongoose.Schema.ObjectId, auto: true}, 
    fname: String,
    lname: String,
    avatar: {
        type: String,
        default: ''
    },
    adresse: {
        adress: String,
        cp: Number,
        city: String,
    },
    birth_date: Date,
    email: String,
    phone: String,
    password: String,
    postes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poste'
    },
    observation: {
        type: String,
        default: ''
    },
    documents: String,
    admin: {
        type: Boolean,
        default: false
    },
    isActive: Boolean,
    created_at: Date,
})

// TODO: Exporter le modèle
module.exports = mongoose.model('Employee', EmployeeSchema)
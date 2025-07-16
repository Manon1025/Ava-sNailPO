const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema ({
    _id: {type : mongoose.Schema.ObjectId, auto: true}, //est généré par mongoDB
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
    birth_date: {
    validate: {
            validator: function(value){ // ça doit renvoyer un true ou un false
                return value < new Date()
            },
            message: 'l\'anniversaire doit être une date passé'
        },
        type: Date,
    },
    email: String,
    phone: Number,
    password: String,
    poste: String,
    observation: {
        type: String,
        default: ''
    },
    documents: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    },
    isActive: Boolean,
    created_at: Date,
})
module.exports = mongoose.model('Employee', EmployeeSchema)
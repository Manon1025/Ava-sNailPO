const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema ({
    _id: {type : mongoose.Schema.ObjectId, auto: true}, //est généré par mongoDB
    fname: String,
    lname: String,
    avatar: {
        type: String,
        default: ''
    },
    birth_date: Date,
    email: String,
    password: String,
    adresse: {
        adress: String,
        cp: Number,
        city: String,
    },
    documents: {
        url: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    },
    isActive: Boolean,
    created_at: Date,
})
module.exports = mongoose.model('Employee', EmployeeSchema)
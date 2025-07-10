const mongoose = require('mongoose')

const DocumentsSchema = new mongoose.Schema ({
    _id: {type : mongoose.Schema.ObjectId, auto: true}, //est généré par mongoDB
    name: String,
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: '',
    },
    created_at: Date,
})
module.exports = mongoose.model('Document', DocumentsSchema)
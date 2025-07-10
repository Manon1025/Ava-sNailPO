const mongoose = require('mongoose')

const PosteSchema = new mongoose.Schema ({
    _id: {type : mongoose.Schema.ObjectId, auto: true}, 
    name: String,
})
module.exports = mongoose.model('Poste', PosteSchema)
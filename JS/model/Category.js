const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema ({
    _id: {type : mongoose.Schema.ObjectId, auto: true}, 
    name: String,
})
module.exports = mongoose.model('Category', CategorySchema)
const Document = require('../model/Document')
const Category = require('../model/Category')

exports.index = async(req, res) => {
    try {
        const documents = await Document.find().populate('category', {name: 1, _id: 0});
        res.render('pages/doc.ejs', {title: 'Documents', documents, user: req.session.user})
    } catch (err) {
        throw err
    }
}

exports.create = async (req, res) => {
    try {
        const {
            name,
            description,
            category
        } = req.body;

        const existanceCategory = await Category.findOne({name: category})
    if(!existanceCategory) {
      return res.status(404).json({message: 'Category inconnue'})
    }

        const file = req.file
        if(!file){
            return res.status(400).json({error: "veuillez sélectionner un fichier"})
        }

        const document = new Document ({
            name,
            description,
            category: existanceCategory._id,
            fileName: file.fileName,
            originalName: file.originalName,
            path: file.path,
            created_at: new Date(),
        })

        // console.log("req.body : ", req.body)
        // console.log("req.file : ", req.file)
        // console.log("document reçu : ", document)

        await document.save()
        res.redirect('/documents')
    } catch (err) {
        throw err
    }
}
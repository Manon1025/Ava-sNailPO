const Document = require('../model/Document')
const Category = require('../model/Category')
const documentValidationSchema = require('../model/validation/documentValidation')

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
        const { category: categoryName } = req.body;
        const existanceCategory = await Category.findOne({name: categoryName})
        if(!existanceCategory) {
            return res.status(404).json({message: 'Category inconnue'})
        }

        const documentData ={
            name: req.body.name,
            description: req.body.description,
            category: existanceCategory._id.toString(),
            fileName: req.file.filename,
        };

        const { error } = documentValidationSchema.validate(documentData);
        if (error) {
            return res.status(400).json({ 
                message: 'Erreur de validation', 
                details: error.details.map(detail => detail.message) 
            });
        }

        console.log('Donnée Validées : ', documentData)

        const document = new Document ({
            name: documentData.name,
            description: documentData.description,
            category: existanceCategory._id,
            fileName: documentData.fileName,
            originalName: req.file.originalname,
            path: req.file.path,
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
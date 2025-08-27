// TODO: Fichier
const Document = require('../model/Document')
const Category = require('../model/Category')
const documentValidationSchema = require('../model/validation/documentValidation')

// TODO: exports des controllers
    // * Afficher la liste des documents
exports.index = async(req, res) => {
    try {
        const documents = await Document.find().populate('category', {name: 1, _id: 0});
        res.render('pages/doc.ejs', {title: 'Documents', documents, user: req.user})
    } catch (err) {
        throw err
    }
}

    // * Créer un nouveau document
exports.create = async (req, res) => {
    try {
        // ! Vérifier si la catégorie existe
        const { category: categoryName } = req.body;
        const existanceCategory = await Category.findOne({name: categoryName})
        if(!existanceCategory) {
            return res.status(404).json({message: 'Category inconnue'})
        }

        // ! Récupérer les données du document
        const documentData ={
            name: req.body.name,
            description: req.body.description,
            category: existanceCategory._id.toString(),
            fileName: req.file.filename,
        };

        // ! Valider les données du document avec Joi
        const { error } = documentValidationSchema.validate(documentData);
        if (error) {
            return res.status(400).json({ 
                message: 'Erreur de validation', 
                details: error.details.map(detail => detail.message) 
            });
        }

        // ! Créer une instance du modèle Document
        const document = new Document ({
            name: documentData.name,
            description: documentData.description,
            category: existanceCategory._id,
            fileName: documentData.fileName,
            originalName: req.file.originalname,
            path: req.file.path,
            created_at: new Date(),
        })

        // ! Enregistrer le document dans la base de données
        await document.save()
        res.redirect('/documents')
        
    } catch (err) {
        throw err
    }
}
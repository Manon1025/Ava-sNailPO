// TODO: Fichier
const Document = require('../model/Document')
const Category = require('../model/Category')
const documentValidationSchema = require('../model/validation/documentValidation')

// TODO: exports des controllers
    // * Afficher la liste des documents
exports.index = async(req, res) => {
    try {
        const documents = await Document.find().populate('category', {name: 1, _id: 0});
        res.render('pages/doc.ejs', {
            title: 'Documents', 
            documents, 
            user: req.user,
        })
    } catch (err) {
        console.error(err);
        res.status(500).render('pages/error', {message: 'Erreur serveur', error: err});
    }
}

    // * Créer un nouveau document
exports.create = async (req, res) => {
    try {
        const errors = [];

        // ! Vérifier si la catégorie existe
        const { category: categoryName } = req.body;
        const existanceCategory = await Category.findOne({name: categoryName})

const documentData = {
    name: req.body.name || '',
    description: req.body.description || '',
    category: existanceCategory ? existanceCategory._id.toString() : '',
    fileName: req.file ? req.file.filename : '',
};

        // ! Valider les données du document avec Joi
        const { error } = documentValidationSchema.validate(documentData, { abortEarly: false });   // ? abortEarly: false permet d'afficher toutes les erreurs
        if (error) errors.push(...error.details.map(d => d.message));


        if (errors.length > 0) {
            return res.status(400).render('pages/addDocument', {
                title: 'Ajouter un document',
                user: req.user,
                details: errors,
                formData: req.body
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
        console.error(err);
        res.status(500).render('pages/error', {message: 'Erreur serveur', error: err});
    }
}
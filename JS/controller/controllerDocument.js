// TODO: Fichier
const { Documents, Category } = require('../model/associations')

// TODO: exports des controllers
    // * Afficher la liste des documents
exports.index = async(req, res) => {
    try {
        const documents = await Documents.findAll({
            include: [
                {
                    model: Category,
                    attributes: ['name']
                }
            ]
        });
        res.render('pages/doc.ejs', {
            title: 'Documents', 
            documents, 
            user: req.user,
        })
    } catch (err) {
        console.error(err);
        res.redirect('/documents');
    }
}

    // * Créer un nouveau document
exports.create = async (req, res) => {
    try {
        const { name, description, category: categoryId } = req.body;

        // ! Vérifier si la catégorie existe
        const existanceCategory = await Category.findByPk(categoryId);
        
        if (!existanceCategory) {
            console.error('Catégorie non trouvée avec ID:', categoryId);
            return res.redirect('/documents');
        }

        if (!req.file) {
            console.error('Aucun fichier uploadé');
            return res.redirect('/documents');
        }

        // ! Créer le document avec Sequelize
        const document = await Documents.create({
            name: name || '',
            description: description || '',
            category_id: existanceCategory.id_category,
            fileName: req.file.filename,
            create_at: new Date(),
        });

        res.redirect('/documents');
    } catch (err) {
        console.error(err);
        res.redirect('/documents');
    }
}
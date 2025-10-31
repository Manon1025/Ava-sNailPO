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
            title: 'Gestion des documents', 
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

    // * Afficher le formulaire d'édition d'un document
exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const document = await Documents.findByPk(id, {
            include: [Category]
        });

        if (!document) {
            console.error('Document non trouvé avec ID:', id);
            return res.redirect('/documents');
        }

        const categories = await Category.findAll();

        res.render('pages/admin/editDocument.ejs', {
            title: 'Modifier le document',
            document,
            categories,
            user: req.user
        });
    } catch (err) {
        console.error(err);
        res.redirect('/documents');
    }
}

    // * Mettre à jour un document
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, category: categoryId } = req.body;

        const document = await Documents.findByPk(id);

        if (!document) {
            console.error('Document non trouvé avec ID:', id);
            return res.redirect('/documents');
        }

        // ! Vérifier si la catégorie existe
        const existanceCategory = await Category.findByPk(categoryId);
        
        if (!existanceCategory) {
            console.error('Catégorie non trouvée avec ID:', categoryId);
            return res.redirect('/documents');
        }

        // ! Préparer les données de mise à jour
        const updateData = {
            name: name || document.name,
            description: description || document.description,
            category_id: existanceCategory.id_category,
        };

        // ! Si un nouveau fichier est uploadé, l'ajouter
        if (req.file) {
            updateData.fileName = req.file.filename;
        }

        // ! Mettre à jour le document
        await document.update(updateData);

        res.redirect('/documents?message=modifié&name=' + encodeURIComponent(document.name));
    } catch (err) {
        console.error(err);
        res.redirect('/documents');
    }
}

exports.destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const document = await Documents.findByPk(id);

        if (!document) {
            console.error('Document non trouvé avec ID:', id);
            return res.redirect('/documents');
        }

        await document.destroy();
        res.redirect('/documents?message=supprimé&name=' + encodeURIComponent(document.name));
    } catch (error) {
        console.error('Erreur lors de la suppression du document:', error);
        res.redirect('/documents');
    }
}
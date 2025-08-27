// TODO: Fichier
const Employee = require("../model/Employee");
const Poste = require("../model/Poste")
const employeeValidationSchema = require("../model/validation/employeeValidation");


// TODO: exports des controllers
  // * Liste de tous les employés
exports.index = async (req, res) => {
  try {
    const employees = await Employee.find().populate('postes', '-_id name');
    res.status(200).render('pages/admin/listingEmployee.ejs', {title: 'Liste des employés', employees , user: req.user});
  } catch (err) {
    throw err;
  }
};

  // * Visu que sur un seul employé par l'id
exports.show = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId).populate('postes', {name: 1, _id: 0});
    res.status(200).render('pages/admin/voir-plus.ejs', {title: 'Voir plus', user_ : employee, user: req.user});
  } catch (err) {
    throw err;
  }
};

  // * Pour supprimer un employee par son id
exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await Employee.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: result.fname + result.lname + "vient d'être supprimé" });
  } catch (err) {
    throw err;
  }
};

  // * Pour ajouter un employé
exports.create = async (req, res) => {
  try {
    // ! Chercher le poste par son nom
    const {postes: posteName} = req.body;
    const existancePoste = await Poste.findOne({ name: posteName });
    if (!existancePoste) {
      return res.status(404).json({ message: 'Le poste est inconnu' });
    }

    // ! Récupérer les données du employé
    const employeeData = {
      fname: req.body.fname,
      lname: req.body.lname,
      avatar: req.file?.filename || 'ASSET/img/avatar-vide.png',
      adresse: [{
        adress: req.body['adresse.adress'],
        cp: parseInt(req.body['adresse.cp']),
        city: req.body['adresse.city']
      }],
      birth_date: req.body.birth_date,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      postes: existancePoste._id.toString(),
      observations: req.body.observation,
      documents: req.body.documents || ''
    };

    // ! Validation avec Joi
    const { error } = employeeValidationSchema.validate(employeeData, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Erreur de validation',
        details: error.details.map(d => d.message)
      });
    }


    // ! Créer une instance du modèle Employee
    const employee = new Employee({
      avatar: employeeData.avatar,
      fname: employeeData.fname,
      lname: employeeData.lname,
      adresse: employeeData.adresse[0],
      birth_date: employeeData.birth_date,
      email: employeeData.email,
      phone: employeeData.phone,
      password: employeeData.password,
      observation: employeeData.observations,
      postes: existancePoste._id.toString(),
      role: req.body.role || 'user',
      created_at: new Date(),
      isActive: true
    });

    // ! Enregistrer l'employé dans la base de données
    await employee.save();
    res.redirect('/listeEmployer');
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


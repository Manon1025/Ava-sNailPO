const { render } = require("ejs");
const Employee = require("../model/Employee");
const Poste = require("../model/Poste")


// * Liste de tous les employés
exports.index = async (req, res) => {
  try {
    const employees = await Employee.find(). populate('postes', {name: 1, _id: 0});
    res.status(200).render('pages/admin/listingEmployee.ejs', {title: 'Liste des employés', employees , user: req.session.user});
  } catch (err) {
    throw err;
  }
};

// * Visu que sur un seul employé par l'id
exports.show = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    res.status(200).render('pages/admin/voir-plus.ejs', {title: 'Voir plus', employee, user: req.session.user});
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
    const adresse = {
        adress: req.body["adresse.adress"],
        cp: parseInt(req.body["adresse.cp"]),
        city: req.body["adresse.city"],
    };

    const {
        fname,
        lname,
        avatar = req.file?.filename || '',
        birth_date,
        email,
        password,
        postes,
        observation,
        role = "user",
    } = req.body;

    // TODO : Vérfication si le poste existe
    const existancePoste = await Poste.findOne({name: postes})
    if(!existancePoste) {
      return res.status(404).json({message: 'le poste est inconnue'})
    }

    const employee = new Employee({
        avatar: avatar || 'ASSET/img/avatar-vide.png',
        fname,
        lname,
        adresse,
        birth_date,
        email,
        password,
        observation,
        postes: existancePoste._id,
        role,
        created_at: new Date(),
        isActive: true,
    });

    await employee.save();
    res.redirect('/listeEmployer');
  } catch (err) {
    throw err;
  }
};

const Employee = require("../model/Employee");
const Poste = require("../model/Poste")
const Document = require("../model/Document")
// const routePages = require('../routes/routePages')

// ! Liste de tous les employés
exports.index = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).render('pages/admin/listingEmployee.ejs', {title: 'Liste des employés',employees});
  } catch (err) {
    throw err;
  }
};
// ! Visu que sur un seul employé par l'id
exports.show = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    res.status(200).json(employee);
  } catch (err) {
    throw err;
  }
};

// ! Pour supprimer un employee par son id
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

// ! Pour ajouter un employé
exports.create = async (req, res) => {
  console.log(req.body)
  try {
    const adresse = {
        adress: req.body["adresse.adress"],
        cp: parseInt(req.body["adresse.cp"]),
        city: req.body["adresse.city"],
    };
    
    const {
        fname,
        lname,
        avatar,
        birth_date,
        email,
        password,
        poste,
        observation,
        documents,
        role = "user",
    } = req.body;

        const existancePoste = await Poste.findOne({name: poste})
    if(!existancePoste) {
      return res.status(404).json({message: 'le poste est inconnue'})
    }

    const documentExistant = await Document.findOne({name: documents})
    if(!documentExistant) {
      console.log("Aucun document trouvé, mais on continue...")
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
        documents,
        poste,
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

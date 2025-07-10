const Employee = require("../model/Employee");

// ! Liste de tous les employés
exports.index = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
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
    const {
        avatar,
        fname,
        lname,
        birth_date,
        email,
        password,
        observation,
        documents,
        poste,
        role = "user",
    } = req.body;

    const adresse = {
        adress: req.body["adresse.adress"],
        cp: parseInt(req.body["adresse.cp"]),
        city: req.body["adresse.city"],
    };

    const employee = new Employee({
        avatar,
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
    res.status(200).json({ message: "L'employé(e) a été ajouté(e) avec succès" });
  } catch (err) {
    throw err;
  }
};

// TODO: Fichier
const { Employee, Poste, Contrat } = require("../model/associations");


// TODO: exports des controllers
  // * Liste de tous les employés
exports.index = async (req, res) => {
  try {
    const employees = await Employee.findAll()
    res.status(200).render('pages/admin/listingEmployee.ejs', {title: 'Liste des employés', employees , user: req.user});
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
}

  // * Visu que sur un seul employé par l'id
exports.show = async (req, res) => {
  try {
    const employeeId = req.params.id_employee;
    const employee = await Employee.findOne({ where: { id_employee: employeeId }, include: [Poste, Contrat] });

    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }

    res.status(200).render('pages/admin/voir-plus.ejs', {title: 'Voir plus', user_ : employee, user: req.user});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

  // * Pour supprimer un employee par son id
exports.destroy = async (req, res) => {
  try {
    const id = req.params.id_employee;
    
    // Infos sur l'employee
    const employee = await Employee.findOne({ where: { id_employee: id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    
    // Suppression
    const result = await Employee.destroy({ where: { id_employee: id } });
    
    // ! Reponse en JSON penser à le changer en réponse RES 
    if (result > 0) {
      res.status(200).json({ 
        message: `${employee.fname} ${employee.lname} vient d'être supprimé` 
      });
    } else {
      res.status(404).json({ message: 'Employé non trouvé' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

  // * Pour ajouter un employé
exports.create = async (req, res) => {
  try {
    const { 
      fname, 
      lname,
      street,
      cp,
      city, 
      birth_date, 
      email, 
      phone, 
      password, 
      poste_id,
      contrat_id, 
      observation,
      role
    } = req.body;

    await Employee.create({
      fname,
      lname,
      street,
      cp,
      city,
      birth_date,
      email,
      phone,
      password,
      poste_id,
      contrat_id,
      observation,
      avatar: req.file?.filename || 'ASSET/img/avatar-vide.png',
      role: role || 0,  // 0 = user, 1 = admin
      create_at: new Date(),
      isActive: true
    });

    res.redirect('/listeEmployer');
  } catch (error) {
    console.error('Erreur lors de la création de l\'employé:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création de l\'employé', 
      error: error.message 
    });
  }
}
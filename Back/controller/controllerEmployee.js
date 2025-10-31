// TODO: Fichier
const { Employee, Poste, Contrat } = require("../model/associations");


// TODO: exports des controllers
  // * Liste de tous les employés actifs seulement
exports.index = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: {
        isActive: true
      },
      include: [
        {
          model: Poste,
          attributes: ['name']
        },
        {
          model: Contrat,
          attributes: ['name']
        }
      ]
    });
    res.status(200).render('pages/admin/listingEmployee.ejs', {
      title: 'Gestion des employés', 
      employees, 
      user: req.user,
      query: req.query
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
}

  // * Visu que sur un seul employé par l'id
exports.show = async (req, res) => {
  try {
    const employeeId = req.params.id;
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

exports.edit = async (req, res) => {
  try {
    const employeeId = req.params.id
    const employee = await Employee.findOne({ 
      where: { id_employee: employeeId },
      include: [Poste, Contrat] 
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }

    const poste = await Poste.findAll();
    const contrat = await Contrat.findAll();

    res.status(200).render('pages/admin/updateEmployee.ejs', {
      title: 'Modifier un employé', 
      employee, 
      poste, 
      contrat, 
      user: req.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const {fname, lname, street, cp, city, birth_date, email, phone, password, poste_id, contrat_id, observation, role} = req.body;

    const employee = await Employee.findOne({ where: { id_employee: id } });

    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }

    const existancePoste = await Poste.findByPk(poste_id);
    if (!existancePoste) {
      return res.status(400).json({ message: 'Poste invalide' });
    }

    const existanceContrat = await Contrat.findByPk(contrat_id);
    if (!existanceContrat) {
      return res.status(400).json({ message: 'Contrat invalide' });
    }

    const updatedData = {
      fname: fname || employee.fname,
      lname: lname || employee.lname,
      street: street || employee.street,
      cp: cp || employee.cp,
      city: city || employee.city,
      birth_date: birth_date || employee.birth_date,
      email: email || employee.email,
      phone: phone || employee.phone,
      password: password || employee.password,
      poste_id: poste_id || employee.poste_id,
      contrat_id: contrat_id || employee.contrat_id,
      observation: observation || employee.observation,
    };

    if (req.file) {
      updatedData.avatar = req.file.filename;
    }

    await employee.update(updatedData);

    res.redirect('/listeEmployer?message=modifié&name=' + encodeURIComponent(employee.fname + ' ' + employee.lname));

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

  // * Pour désactiver un employé par son id 
exports.deactivate = async (req, res) => {
  try {
    const id = req.params.id;
    
    // ! Infos sur l'employé
    const employee = await Employee.findOne({ where: { id_employee: id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    
    // ! Désactivation 
    const result = await Employee.update(
      { isActive: false }, 
      { where: { id_employee: id } }
    );
    
    if (result > 0) {
      // ! Redirection avec un message de succès
      res.redirect('/listeEmployer?message=désactivé&name=' + encodeURIComponent(employee.fname + ' ' + employee.lname));
    } else {
      res.status(404).json({ message: 'Impossible de désactiver l\'employé' });
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

    const employee = await Employee.create({
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
      role: role || 0,
      create_at: new Date(),
      isActive: true
    });

    res.redirect('/listeEmployer?message=ajouté&name=' + encodeURIComponent(employee.fname + ' ' + employee.lname));
  } catch (error) {
    console.error('Erreur lors de la création de l\'employé:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création de l\'employé', 
      error: error.message 
    });
  }
}
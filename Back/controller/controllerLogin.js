// TODO: Module
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SESSION_SECRET

// TODO: Fichier
const { Employee, Poste } = require("../model/associations");

// TODO: exports des controllers
  // * Pour se déconnecter
exports.destroy = async(req, res) => {
    // ! nettoyage du token
    res.clearCookie('token')
    return res.redirect('/login')
}

  // * Pour se connecter
exports.create = async (req, res) => {
  const {email, password} = req.body
  if(!email || !password){
    return res.status(400).render("login", {
      title: 'Se Connecter',
      error: 'Email et mot de passe requis',
      hideLayout: true
    })
  }

  try {
    // ! Vérifier si l'utilisateur existe
    const user = await Employee.findOne({ 
      where: { email: email },
      include: [
        {
          model: Poste,
          attributes: ['name']
        }
      ]
    });
    
    if(!user){
      return res.status(401).render("login", {
        title: 'Se Connecter',
        error: 'Identifiants incorrects',
        hideLayout: true
      })
    }

    // ! Vérifier si le compte est actif
    if(!user.isActive){
      return res.status(401).render("login", {
        title: 'Se Connecter',
        error: 'Votre compte a été désactivé. Contactez un administrateur.',
        hideLayout: true
      })
    }

    // ! Vérifier le mot de passe
    if(user.password !== password) {
      return res.status(401).render("login", {
        title: 'Se Connecter',
        error: 'Identifiants incorrects',
        hideLayout: true
      })
    }

    // ! Création du token
    const token = jwt.sign({
          fname: user.fname,
          lname: user.lname,
          birth_date: user.birth_date,
          avatar: user.avatar || 'ASSET/img/avatar-vide.png',
          poste: user.Poste ? user.Poste.name : 'Non défini',
          street: user.street,
          city: user.city,
          cp: user.cp,
          phone: user.phone,
          email: user.email,
          role: user.role,
          observation: user.observation,
          isActive: user.isActive
    }, SECRET_KEY, {expiresIn: '1h'})

    // ! Enregistrement du token dans un cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      expires: new Date(Date.now() + 3600000) // 1 heure
    })

    return  res.redirect('/')

  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    return res.status(500).render("login", {
      title: 'Se Connecter',
      error: 'Erreur serveur. Veuillez réessayer.',
      hideLayout: true
    });
  }
};
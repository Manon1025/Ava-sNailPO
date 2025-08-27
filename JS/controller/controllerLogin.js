// TODO: Module
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SESSION_SECRET

// TODO: Fichier
const Employee = require("../model/Employee");

// TODO: exports des controllers
  // * Pour se déconnecter
exports.destroy = async(req, res) => {
    res.clearCookie('token')
    return res.redirect('/login')
}

  // * Pour se connecter
exports.create = async (req, res) => {
  const {email, password} = req.body
  if(!email || !password){
    return res.status(400).render("login", {
      error: 'Email et mot de passe requis'
    })
  }

  try {
    // ! Vérifier si l'utilisateur existe
    const user = await Employee.findOne({ email: email }).populate('postes', {name: 1, _id: 0}) 
    if(!user){
      return res.status(401).render("login", {
        error: 'Identifiants incorrects'
      })
    }

    const token = jwt.sign({
          fname: user.fname,
          lname: user.lname,
          birth: user.birth_date,
          avatar: user.avatar || 'ASSET/img/avatar-vide.png',
          poste: user.postes,
          adresse: user.adresse.adress,
          city: user.adresse.city,
          cp: user.adresse.cp,
          phone: user.phone,
          email: user.email,
          admin: user.admin,
          observation: user.observation,
    }, SECRET_KEY, {expiresIn: '1h'})

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      expires: new Date(Date.now() + 3600000) // 1 heure
    })

    // ! Vérifier si le mot de passe est correct
      // if(user.password == password){
      // // ! Authentifier l'utilisateur
      //   req.session.user = {
      //     fname: user.fname,
      //     lname: user.lname,
      //     birth: user.birth_date,
      //     avatar: user.avatar || 'ASSET/img/avatar-vide.png',
      //     poste: user.postes,
      //     adresse: user.adresse.adress,
      //     city: user.adresse.city,
      //     cp: user.adresse.cp,
      //     phone: user.phone,
      //     email: user.email,
      //     admin: user.admin,
      //     observation: user.observation,
      //   }
      return  res.redirect('/')

  } catch (err) {
    throw err
  }
};
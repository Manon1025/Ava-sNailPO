// TODO: Fichier
const Employee = require("../model/Employee");

// TODO: exports des controllers
  // * Pour se déconnecter
exports.destroy = async(req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/login')
    })
}

  // * Pour se connecter
exports.create = async (req, res) => {
  try {
    const {email, password} = req.body
    // ! Vérifier si l'utilisateur existe
    const user = await Employee.findOne({ email: email }).populate('postes', {name: 1, _id: 0}) 
    if(!user) return res.redirect('/login')
    // ! Vérifier si le mot de passe est correct
      if(user.password == password){
      // ! Authentifier l'utilisateur
        req.session.user = {
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
        }
        res.redirect('/')
      } else {
        res.redirect('/login')
      }
  } catch (err) {
    throw err
  }
};
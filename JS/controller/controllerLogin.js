const Employee = require("../model/Employee");

exports.destroy = async(req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/login')
    })
}

exports.create = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await Employee.findOne({ email: email }).populate('postes', {name: 1, _id: 0}) 
    if(!user) return res.redirect('/login')
      if(user.password == password){
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
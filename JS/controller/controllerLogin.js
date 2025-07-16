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
    const user = await Employee.findOne({ email: email })
    console.log(user)
    if(!user) return res.redirect('/login')
      if(user.password == password){
        req.session.user = {
          fname: user.fname,
          lname: user.lname,
          poste: user.poste,
          adresse: user.adresse.adress,
          city: user.adresse.city,
          complement: user.adresse.complement,
          phone: user.telephone,
          email: user.email,
        }
        res.redirect('/')
      } else {
        res.redirect('/login')
      }
  } catch (err) {
    throw err
  }
};
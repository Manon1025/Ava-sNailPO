const Employee = require("../model/Employee");

exports.create = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await Employee.findOne({email: email})
    if(!user) return res.redirect('/login')
      if(user.password == password){
        req.session.user = user
        res.redirect('/')
      } else {
        res.redirect('/login')
      }
  } catch (err) {
    throw err
  }
};
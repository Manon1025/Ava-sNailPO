// TODO: Module
const jwt = require('jsonwebtoken')
require('dotenv').config()

// TODO: Middleware pour récupérer l'utilisateur courant
module.exports = (req, res, next) => {
    res.locals.currentUser = null;

    const token = req.cookies?.token;
    if(token){
        try {
            res.locals.currentUser = jwt.verify(
                token,
                process.env.SESSION_SECRET
            ).fname
        } catch (e) {
            console.error(e);
        }
    }
    next();
}
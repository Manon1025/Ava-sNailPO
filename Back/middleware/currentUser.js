// TODO: Module
const jwt = require('jsonwebtoken')
require('dotenv').config()

// TODO: Middleware pour récupérer l'utilisateur courant
module.exports = (req, res, next) => {
    res.locals.currentUser = null;
    req.user = null;

    const token = req.cookies?.token;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.SESSION_SECRET);
            res.locals.currentUser = decoded.fname;
            req.user = decoded;  // Ajouter l'utilisateur complet à req.user
        } catch (e) {
            console.error(e);
        }
    }
    next();
}
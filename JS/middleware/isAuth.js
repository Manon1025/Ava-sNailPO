// // TODO: Middleware pour vérifier si l'utilisateur est authentifié
// function isAuth(req, res, next){   
//     // * Vérifier si l'utilisateur est authentifié
//     if(!req.session.user) { 
//         return res.redirect("/login");
//     }
//     next();
// }                                                           

// // TODO: Exporter le middleware
// module.exports = isAuth;

const jwt = require('jsonwebtoken')
require('dotenv').config()

function isAuth(req, res, next){
    const SECRET_KEY = process.env.SESSION_SECRET;
    const token = req.cookies && req.cookies.token
    if(!token) return res.redirect('/login')

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        console.error('❌ Token invalide ou expiré:', e.message)
        return res.redirect('/login');
    }
}

module.exports = isAuth;
// TODO: Middleware pour vérifier si l'utilisateur est authentifié
function isAuth(req, res, next){   
    // * Vérifier si l'utilisateur est authentifié
    if(!req.session.user) { 
        return res.redirect("/login");
    }
    next();
}                                                           

// TODO: Exporter le middleware
module.exports = isAuth;
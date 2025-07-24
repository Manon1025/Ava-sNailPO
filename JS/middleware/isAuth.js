function isAuth(req, res, next){                                    // ? Middleware to check if the user is authenticated
    if(!req.session.user) { 
        return res.redirect("/login");
    }
    next();
}                                                           

module.exports = isAuth;
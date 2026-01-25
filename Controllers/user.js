const User = require("../models/user");



module.exports.renderSignupEjs = (req, res) => {
    res.render("users/signup.ejs")
}


module.exports.Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Create new user
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            return res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}


module.exports.renderLoginEjs = (req, res) => {
    res.render("users/login.ejs")
}


module.exports.loginByPassport = async (req, res) => {
    req.flash("success", "Welcome Back To Wanderlust!");
    res.redirect(res.locals.redirectUrl || "/listings")
}



module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "you are sucessfully logged out!");
        res.redirect("/listings")
    })
}

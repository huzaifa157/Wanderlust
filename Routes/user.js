const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../Controllers/user")


router.route("/signup")
.get( userController.renderSignupEjs)
.post(wrapAsync( userController.Signup));


router.route("/login")
.get( userController.renderLoginEjs)
.post( saveRedirectUrl, passport.authenticate("local", {failureRedirect:"login", failureFlash:true}), userController.loginByPassport)


router.get("/logout" , userController.logout)


module.exports = router;
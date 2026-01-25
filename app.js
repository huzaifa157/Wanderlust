const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError")
const listingsRouter = require("./Routes/listings");
const reviewsRouter = require("./Routes/review");
const userRouter = require("./Routes/user")
const session = require("express-session");
const flash = require("connect-flash")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

main().then(() => console.log("DB is connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")))


const sessionOptions = {
  secret: "super-secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 14 * 24 * 60 * 60 * 1000,
    maxAge: 14 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize()); /*starts Passport so it can work in your app.*/
app.use(passport.session());    /* allows Passport to store user info in session so the user stays logged in across pages.*/

// Set up the strategy
passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));   /* LocalStrategy → tells Passport to use username & password login.*/
/*User is your user model scheme & authenticate() This is a built-in function provided by passport-local-mongoose.
It automatically checks if the username exists and if the password matches the hash stored in your MongoDB.       */


passport.serializeUser(User.serializeUser());   /*User logs in → serializeUser stores user._id in session*/
passport.deserializeUser(User.deserializeUser()); /*n next request → deserializeUser uses that _id to fetch user from DB → makes req.user available.*/

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error")
  res.locals.currUser = req.user;
  next()
})



app.get("/", (req, res) => {
  res.send("server is there")
})

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter)


app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});


app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).render("listing/error.ejs", { message, status });
});


app.listen(8080, () => {
  console.log("server is running")
})


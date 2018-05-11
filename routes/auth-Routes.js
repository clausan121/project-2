// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const User = require("../models/user");
const session    = require("express-session");
const passport = require('passport');
const flash = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth/profile", { user: req.user });
});

// authRoutes.get('/auth/spotify',
//   passport.authenticate('spotify'),
//   function(req, res){
//     // The request will be redirected to spotify for authentication, so this
//     // function will not be called.
//   });

// authRoutes.get('/auth/spotify/callback',
//   passport.authenticate('spotify', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect
//     res.redirect('/profile');
//   });

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = authRoutes;
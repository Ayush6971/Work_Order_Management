const express = require("express");
const router = express.Router();
const Auth = require("../controller/AuthController");
const passport = require('passport')
const isAuthenticated = require('../middlewares/isAuthenticated')


//login route
router.post('/login', (req, res, next) =>{ passport.authenticate('local')(req, res, next)}, Auth.login);

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
  req.logout();
});


router.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.');
});


module.exports = router;

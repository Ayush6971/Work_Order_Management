//const baseUrl = "http://localhost:1338";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require('../models/user')

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let existingUser = {};
  User.findOne({ id: id })
    .populate("role")
    .exec(async function (err, user) {
        if (user) {
            existingUser.firstName = user ? user.firstName : user.email;
            existingUser.lastName = user ? user.lastName : "";
            existingUser.phoneNo = user ? user.phoneNo : "";
            existingUser.email = user ? user.email : '';
            existingUser.id = user ? user.id : '';
            existingUser.role = user ? user.role : [];
            existingUser.tokenType = 'JWT ';
            done(err, existingUser);
          }else{
            done(null,false);
          }
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "phoneNo",
      passwordField: "password",
    },
    async function (phoneNo, password, done) {
      let user = await User.findOne({ phoneNo: phoneNo }).populate("role");
      console.log("🚀 ~ file: passport.js ~ line 39 ~ user", user)

      if (!user) {
        return done(null, false, { message: "Incorrect Phone Number" });
      }
      bcrypt.compare(password, user.password, function (err, res) {
        if (err) return done(null, false, {message:"Something went wrong"});
        if (!res) return done(null, false, {message: "Invalid Password"});
        let returnUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNo: user.phoneNo,
        email: user.email,
        createdAt: user.createdAt,
        id: user.id,
        role: user.role,
        };
        return done(null, returnUser, {
          message: "Logged In Successfully",
        });
      });
    }
  )
);
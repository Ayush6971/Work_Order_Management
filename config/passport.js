const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { userFindOne } = require('../controller/CommonController')

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  userFindOne({ _id: _id }, 'role').then((user) => {
    if (user) {
      let existingUser = {};
      existingUser.firstName = user ? user.firstName : user.email;
      existingUser.lastName = user ? user.lastName : "";
      existingUser.phoneNo = user ? user.phoneNo : "";
      existingUser.email = user ? user.email : '';
      existingUser.id = user ? user.id : '';
      existingUser.role = user ? user.role : [];
      done(null, existingUser);
      console.log("🚀 ~ file: passport.js ~ line 21 ~ userFindOne ~ existingUser", existingUser)
    }else{
      done(null,false);
    }   
  }).catch(err=>{
  console.log("🚀 ~ file: passport.js ~ line 55 ~ userFindOne ~ err", err)
  });
});

  passport.use(
    new LocalStrategy({ usernameField: 'email' },async (email, password, done) => {
      // Match user
       let user = await userFindOne({ email: email }, 'role');
        if (!user) {
          return done(null, false, { message: 'This Phone Number is not registered' });
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
    
    })
  );


module.exports = passport;
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
      let requestUser = {};
      requestUser.firstName = user ? user.firstName : user.email;
      requestUser.lastName = user ? user.lastName : "";
      requestUser.phoneNo = user ? user.phoneNo : "";
      requestUser.email = user ? user.email : '';
      requestUser.id = user ? user.id : '';
      requestUser.role = user ? user.role : [];
      done(null, requestUser);
    }else{
      done(null,false);
    }   
  }).catch(err=>{
  console.log("🚀 ~ file: passport.js ~ line 55 ~ userFindOne ~ err", err)
  });
});

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      // Match user
       let user = await userFindOne({ email: email }, 'role');
        if (!user) {
          return done(null, false, { message: 'This Email is not registered' });
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            let returnUser = {
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNo: user.phoneNo,
              email: user.email,
              createdAt: user.createdAt,
              _id: user.id,
              role: user.role.authority
            };
            return done(null, returnUser);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
    
    })
  );


module.exports = passport;
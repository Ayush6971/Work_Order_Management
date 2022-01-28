const rAuth = require("./r-Auth");
const rUser = require("./r-user")
const User = require("../controller/UserController");
 
module.exports = (app) => {
  app.use("/", rAuth);
  app.use("/",rUser)
  app.get('/resetEmailVerify/:emailResetToken/:newEmail', User.resetEmailToken);

};
